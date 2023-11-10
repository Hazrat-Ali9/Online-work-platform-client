"use client";

import { cn } from "@/utils/cn";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  value?: string | string[] | number | number[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  className?: string;
  readonly?: boolean;
  checked?: boolean;
}

const FormRating = ({
  name,
  type,
  value,
  checked,
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
    setValue,
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  useEffect(() => {
    if (name === "rating") {
      setValue(name, value);
    }
  }, [value, name, setValue]);

  return (
    <>
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
        render={({ field: { value, ...restField } }) => {
          return (
            <input
              type={type}
              value={`${value}-1`}
              placeholder={placeholder}
              className={cn("mask mask-star-2 bg-orange-400")}
              checked={checked}
              {...restField}
            />
          );
        }}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormRating;
