import React, { type ReactNode } from "react";

interface buttonProps {
  className?: string;
  variant?: "standard" | "outline" | "text";
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
  text: "bg-transparent hover:bg-[#f8f8f8] active:bg-[#f8f8f8] underline",
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
}: buttonProps): JSX.Element => {
  return (
    <button
      className={`duration-800 container flex h-11 w-fit cursor-pointer items-center justify-center rounded px-4 leading-loose ${buttonVariants[variant]} ${className} `}
      {...props}
      onClick={disabled ? () => onClick : undefined}
    >
      {startIcon && <span className="h-5 w-5">{startIcon}</span>}
      <span className="px-2">{children}</span>
      {endIcon && <span className="h-5 w-5">{endIcon}</span>}
    </button>
  );
};

export { Button };
