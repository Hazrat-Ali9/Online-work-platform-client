"use client";

import { cn } from "@/utils/cn";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  className?: string;
  readonly?: boolean;
}

const FormInput = ({
  name,
  type,
  value,
  id,
  placeholder,
  validation,
  label,
  className,
  required,
  readonly = false,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="flex flex-col gap-y-3">
      {label ? (
        <label htmlFor={id ? id : ""}>
          {label}
          {required ? (
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            readOnly={readonly}
            className={cn("input input-bordered w-full max-w-xs", className)}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormInput;
