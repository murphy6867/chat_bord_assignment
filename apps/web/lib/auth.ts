"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
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
    redirect("/auth/signin");
  } else
    return {
      message:
        response.status === 409
          ? "The user is already existed!"
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
      // TODO: Create The Session
      console.log({ result });
    } else {
      return {
        message: response.status === 401 ? "Invalid Credentials!" : response.statusText,
      }
    }
}
