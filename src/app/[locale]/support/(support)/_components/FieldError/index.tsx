import { FieldErrorProps } from "./type";

const FieldError = ({ formState, name }: FieldErrorProps) => {
  return (
    <span className="text-xs text-red-400 text-center mt-2">
      {formState.fieldErrors[name]?.[0]}
    </span>
  );
};

export { FieldError };
