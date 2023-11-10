"use client";

import { useEffect, useState } from "react";
import { DayPicker, useInput } from "react-day-picker";
import { cn } from "@/utils/cn";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
import "react-day-picker/dist/style.css";
import "./FormDatePicker.css";

type DatePickerProps = {
  id?: string;
  onChange?: (value: Date) => void;
  name: string;
  label?: string;
  value?: Date;
  required?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
};

const FormDatePicker = ({
  id,
  name,
  required = false,
  value,
  label,
  className,
  placeholder,
  type,
}: DatePickerProps) => {
  const {
    getValues,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { inputProps, dayPickerProps } = useInput({
    defaultSelected: getValues(name) ? new Date(getValues(name)) : new Date(),
    fromYear: 1971,
    toYear: 2023,
    format: "PP",
    required: true,
  });

  useEffect(() => {
    setValue(
      name,
      new Date((inputProps as Record<string, any>).value).toISOString()
    );
  }, [inputProps, name, setValue]);

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
        render={({ field }) => {
          return (
            <input
              value={inputProps.value}
              type={type}
              placeholder={placeholder}
              className={cn("input input-bordered w-full max-w-xs", className)}
              onClick={() =>
                (document as any).getElementById("datepicker-modal").showModal()
              }
            />
          );
        }}
      />
      <dialog id="datepicker-modal" className="modal text-white">
        <div className="modal-box w-auto">
          <DayPicker {...dayPickerProps} captionLayout="dropdown-buttons" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FormDatePicker;
