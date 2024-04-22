import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  errorMessage?: string;
  successMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id = "bazaar-text-input",
  errorMessage,
  successMessage,
  ...rest
}) => {
  const hasError = Boolean(errorMessage);
  const isSuccess = Boolean(successMessage);

  return (
    <div id={`${id}-container`} className="flex flex-col">
      <input
        type={rest.type ?? "text"}
        className={`w-full rounded-md border-2 p-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none ${hasError ? "border-red-500" : isSuccess ? "border-green-500" : "border-gray-300"}`}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={
          hasError ? `${id}-error` : isSuccess ? `${id}-success` : undefined
        }
        {...rest}
      />
      {hasError && (
        <span id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {errorMessage}
        </span>
      )}
      {isSuccess && (
        <span id={`${id}-success`} className="mt-1 text-sm text-green-500">
          {successMessage}
        </span>
      )}
    </div>
  );
};

export default TextInput;
