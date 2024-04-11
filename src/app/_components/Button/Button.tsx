import React, { type ReactNode } from "react";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "standard" | "outline" | "text";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconSize?: "sm" | "md" | "lg";
  children?: ReactNode;
}

const iconSizes = {
  sm: 4,
  md: 5,
  lg: 6,
};
const buttonVariants = {
  standard:
    "bg-black text-white hover:bg-gray-900 active:bg-gray-900 h-11 px-2",
  outline:
    "bg-transparent hover:bg-gray-100 active:bg-gray-100 border border-black h-11 px-2",
  text: "bg-transparent hover:text-red-700 active:text-red-700 underline",
};

const Button = ({
  variant = "standard",
  className,
  startIcon,
  endIcon,
  iconSize = "md",
  children,
  ...props
}: buttonProps): JSX.Element => {
  const disabledStyling =
    variant === "text"
      ? "disabled:cursor-not-allowed disabled:text-gray-500 disabled:no-underline"
      : "disabled:cursor-not-allowed disabled:border-0 disabled:bg-gray-200 disabled:text-white";

  return (
    <button
      className={`duration-800 flex cursor-pointer items-center justify-center rounded leading-loose ${disabledStyling} ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {startIcon && (
        <span className={`h-${iconSizes[iconSize]} w-${iconSizes[iconSize]}`}>
          {startIcon}
        </span>
      )}
      {children && <span className="mx-1">{children}</span>}
      {endIcon && (
        <span className={`h-${iconSizes[iconSize]} w-${iconSizes[iconSize]}`}>
          {endIcon}
        </span>
      )}
    </button>
  );
};

export { Button };
