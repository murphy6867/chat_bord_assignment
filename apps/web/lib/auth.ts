"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { createSession } from "./session";

import { FormState, SignupFormSchema, SignInFormSchema } from "./types";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/signin");
  } else
    return {
      message:
        response.status === 409
          ? "The user is already existed"
          : response.statusText,
    };
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignInFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
  }};

    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationFields.data),
    });

    if (response.ok) {
      const result = await response.json()
      await createSession({
        user: {
          id: result.id,
          name: result.username,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      })
      console.log({ result }); 
      redirect("/")
    } else {
      return {
        message: response.status === 401 ? "Email or Password Incorrect" : response.statusText,
      }
    }
}
