"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";

import { signUp } from "@/lib/auth";

const SignUpForm: FC = () => {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <div className=" min-w-80 lg:w-1/2 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-white">Sign up</h1>
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
            className="bg-white rounded-xl py-5"
          />
          {state?.error?.username && (
            <p className="text-sm text-red-500">{state.error?.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email:{" "}
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Input your Email"
            className="bg-white rounded-xl py-5"
          />
          {state?.error?.email && (
            <p className="text-sm text-red-500">{state.error?.email}</p>
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
            className="bg-white rounded-xl py-5"
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

        <SubmitButton>Sign Up</SubmitButton>

        <p className="text-center text-white text-sm">
          Have an account?{" "}
          <Link href={"/signin"} className="font-bold underline">
            sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
