import React, { type ReactNode } from "react";

interface buttonProps {
  className?: string;
  variant?: "standard" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}
const buttonVariants = {
  standard:
    "bg-[#1c1c1c] text-[#f8f8f8] hover:bg-[#525252] active:bg-[#525252]",
  outline:
    "bg-transparent hover:bg-[#f8f8f8] active:bg-[#f8f8f8] border border-black",
};
//${disabled ? "cursor-default bg-neutral-300  hover:bg-neutral-300 active:bg-neutral-300" : ""}
const Button = ({
  variant = "standard",
  className,
  startIcon,
  endIcon,
  children,
  disabled,
  onClick,
  ...props
}: buttonProps) => {
  return (
    <button
      className={`duration-800 container flex h-11 w-fit cursor-pointer items-center rounded px-4 leading-loose ${buttonVariants[variant]} ${className}`}
      {...props}
      onClick={disabled ? () => onClick : undefined}
    >
      {startIcon && <span className="pr-1">{startIcon}</span>}
      <span className="px-1">{children}</span>
      {endIcon && <span className="pl-1">{endIcon}</span>}
    </button>
  );
};

export { Button };
