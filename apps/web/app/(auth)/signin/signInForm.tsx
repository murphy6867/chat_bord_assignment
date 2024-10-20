"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";

import { signIn } from "@/lib/auth";

const SignUpForm: FC = () => {
  const [state, action] = useFormState(signIn, undefined);

  return (
    <div className=" min-w-80 lg:w-1/2 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-white">Sign In</h1>
      <form action={action} className="flex flex-col space-y-4 px-4">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">
            Username:{" "}
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="Input your Username"
            className="bg-white"
          />
          {state?.error?.username && (
            <p className="text-sm text-red-500">{state.error?.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password:{" "}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Input your Password"
            className="bg-white"
          />
          {state?.error?.password && (
            <p className="text-sm text-red-500">{state.error?.password}</p>
          )}
        </div>

        <SubmitButton>Sign In</SubmitButton>

        <div className="text-center">
          <p className=" text-white text-sm">
            Haven't an account?{" "}
            <Link href={"/signup"} className="font-bold underline">
              sign up
            </Link>
          </p>
          <Link href={"/blog"} className="text-xs underline text-white">
            Continue as guest
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
