import { FC } from "react";
import { cn } from "@/app/utils/cn";
import type { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  className,
  value = "Button",
  ...props
}) => {
  return (
    <button
      className={cn("bg-green-600 hover:bg-green-400 text-white py-2 rounded-lg font-bold", className)}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
