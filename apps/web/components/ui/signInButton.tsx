"use client";

import React, { PropsWithChildren, FC } from "react";
import Link from "next/link";

import { Button } from "./button";

const SignInButton: FC<PropsWithChildren> = ({ children }) => {

  return (
    <>
      {" "}
      <Link href={"/auth/signin"}>
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 rounded-xl hidden md:block"
        >
          {children}
        </Button>
      </Link>
    </>
  );
};

export default SignInButton;
