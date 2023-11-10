"use client";

import { cn } from "@/utils/cn";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";

interface ITextArea {
  name: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  className?: string;
  readonly?: boolean;
}

const FormTextArea = ({
  name,
  value,
  id,
  placeholder,
  validation,
  label,
  className,
  required,
  readonly = false,
}: ITextArea) => {
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
          <textarea
            placeholder={placeholder}
            readOnly={readonly}
            className={cn("textarea textarea-primary", className)}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormTextArea;
