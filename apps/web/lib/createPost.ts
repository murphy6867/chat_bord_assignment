/* eslint-disable no-unused-vars */
"use server";

import { redirect } from "next/navigation";

import { BACKEND_URL } from "./constants";
import { createPostSchema, Session } from "./types";
import { getSession } from "./session";

export async function createPost(formData: FormData) {
  const session: Session | null = await getSession();

  const response = await fetch(`http://localhost:8000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      content: formData.get("content"),
      userId: session?.user.id,
    }),
  });

  if (response.ok) {
    redirect("/");
  }
}
