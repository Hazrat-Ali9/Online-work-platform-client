"use client";

import { cn } from "@/utils/cn";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  id?: string;
  options: SelectOptions[];
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: any) => void;
  required?: boolean;
  className?: string;
};

const FormSelect = ({
  id,
  name,
  required = false,
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  className,
}: SelectFieldProps) => {
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
        render={({ field: { value, onChange } }) => (
          <select
            onChange={handleChange ? handleChange : onChange}
            className={cn("select select-primary w-full max-w-xs", className)}
            value={value ? value : ""}
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={
                  name === "gender" ? option.value.toUpperCase() : option.value
                }
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormSelect;
