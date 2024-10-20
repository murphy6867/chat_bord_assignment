import { z } from "zod";

export type FormState =
  | {
      error?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters." })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const SignInFormSchema = z.object({
  username: z.string().min(1, { message: "Username field must not be empty." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export type Session = {
  user: {
    id: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type PostState =
  | {
      error?: {
        title?: string[];
        content?: string[];
        userId: number;
      };
      message?: string;
    }
  | undefined;

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title should have at least 1 charecter." }),
  content: z
    .string()
    .min(1, { message: "Title should have at least 1 charecter." }),
  userId: z.number(),
});
