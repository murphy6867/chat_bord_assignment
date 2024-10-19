import { FC } from "react";
import Link from "next/link";

import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";

const SignUpForm: FC = () => {
  return (
    <div className=" min-w-80 lg:w-1/2 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-white">Sign up</h1>
      <form className="flex flex-col space-y-4 px-4">
        <Input placeholder="User name" id="username" isHaveLabel={true} labelText="User name:" inputType="text" />
        <Input placeholder="Input your email" id="email" isHaveLabel={true} labelText="Email:" inputType="email" />
        <Input placeholder="Input your password" id="password" isHaveLabel={true} labelText="Password:" inputType="password" />
        <br />
        <Button className="" type="submit" value="Sign Up" />
        <p className="text-center text-white text-sm">Have an account? <Link href={"/auth/sign-in"} className="font-bold">sign in</Link></p>
      </form>
    </div>
  );
};

export default SignUpForm;