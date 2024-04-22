import React from "react";

interface TextInputProps {
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  errorMessage?: string;
  successMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  errorMessage,
  successMessage,
}) => {
  const isError = Boolean(errorMessage);
  const isSuccess = Boolean(successMessage);

  return (
    <div className="flex flex-col">
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full rounded-md border-2 p-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none ${isError ? "border-red-500" : isSuccess ? "border-green-500" : "border-gray-300"}`}
        aria-invalid={isError ? "true" : "false"}
        aria-describedby={
          isError ? `${id}-error` : isSuccess ? `${id}-success` : undefined
        }
      />
      {isError && (
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
