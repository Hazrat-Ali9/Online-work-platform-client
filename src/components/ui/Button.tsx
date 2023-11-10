import { cn } from "@/utils/cn";
import React from "react";

type BtnProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, className, ...props }: BtnProps) => {
  return (
    <button {...props} className={cn(`btn btn-primary w-full mt-5`, className)}>
      {children}
    </button>
  );
};

export default Button;
