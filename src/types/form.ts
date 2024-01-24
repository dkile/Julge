import { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

export type FormRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<
  Record<
    TName,
    Omit<
      RegisterOptions<TFieldValues, TName>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >
  >
>;
