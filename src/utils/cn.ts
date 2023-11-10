import clsx from "clsx";
import { twMerge, ClassNameValue } from "tailwind-merge";

export const cn = (...classes: ClassNameValue[]) => twMerge(clsx(...classes));
