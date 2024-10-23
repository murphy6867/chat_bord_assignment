"use client";

import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <>
      {" "}
      <Button
        type="submit"
        aria-disabled={pending}
        className="w-full bg-green-600 hover:bg-green-400 text-white rounded-xl py-5"
      >
        {pending ? "Submitting ... " : children}
      </Button>
    </>
  );
};

export default SubmitButton;
