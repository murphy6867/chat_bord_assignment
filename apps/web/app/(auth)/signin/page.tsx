import React from "react";
import Image from "next/image";

import SignInForm from "./signInForm";
import CoverImage from "@/public/images/auth_cover.png";

const SignUpPage: React.FC = () => {
  return (
    <main className="min-w-screen min-h-screen flex flex-col lg:flex-row-reverse bg-green-950">
      <section aria-label="Cover image field" className="w-full lg:w-2/5 bg-green-900 rounded-b-3xl lg:rounded-l-3xl">
        <div className="flex flex-col items-center justify-center h-96 lg:h-full space-y-10">
          <Image
            src={CoverImage}
            alt="a Board Logo"
            width={200}
            height={200}
          />
          <i className="text-white font-bold text-xl">a Board</i>
        </div>
      </section>
      <section aria-label="Form input field" className="w-full lg:w-3/5 h-auto lg:h-auto flex items-center justify-center py-10">
        <SignInForm />
      </section>
    </main>
  );
};

export default SignUpPage;
