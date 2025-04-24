import { twMerge } from "tw-merge";
import clsx, { ClassValue } from "clsx";

export function classMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
