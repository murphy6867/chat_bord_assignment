"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";

import { signUp } from "@/lib/auth";

const SignInForm: FC = () => {
  
  const [state, action] = useFormState(signUp, undefined);

  return (
    <div className=" min-w-80 lg:w-1/2 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-white">Sign In</h1>
      <form action={action} className="flex flex-col space-y-4 px-4">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        <div>
          <Label htmlFor="name">Name: </Label>
          <Input id="name" name="name" placeholder="Input your Name" />
          {state?.error?.name && (
            <p className="text-sm text-red-500">{state.error?.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password: </Label>
          <Input
            id="password"
            name="password"
            placeholder="Input your Password"
          />
          {state?.error?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.error.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <SubmitButton>Sign In</SubmitButton>

        <p className="text-center text-white text-sm">
          Haven't an account?{" "}
          <Link href={"/auth/signup"} className="font-bold">
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
