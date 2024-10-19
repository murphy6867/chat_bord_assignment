import { FC } from "react";
import { cn } from "@/app/utils/cn";
import type { InputProps } from "./types";

const Input: FC<InputProps> = ({
  className,
  placeholder,
  isHaveLabel,
  labelText,
  inputType,
  ...props
}) => {
  const inputId = isHaveLabel
    ? labelText?.replace(/\s+/g, "-").toLowerCase()
    : undefined;

  return (
    <div className="flex flex-col space-y-1">
      {isHaveLabel && (
        <label
          htmlFor={inputId}
          className="text-lg font-medium text-white"
        >
          {labelText}
        </label>
      )}
      <input
        id={inputId}
        type={inputType}
        className={cn(
          "w-full bg-white text-green-900 py-2 px-4 rounded-lg font-normal",
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
