import type { FieldError, UseFormRegister } from "react-hook-form";
import type { FormData } from "../app/types";

type ValidFieldNames = "name" | "email";

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  defaultValue?: string;
}

const FormInput = ({
  label,
  type,
  placeholder,
  name,
  register,
  error,
  defaultValue,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <h1>{label}</h1>
      <input
        className="h-8 w-full rounded-md border border-[#DCD7C9] shadow-md placeholder:opacity-30 focus:ring-1 focus:ring-[#DCD7C9] focus:outline-none active:outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
      />
      {error && <span className="text-red-600 text-sm italic">{error.message}</span>}
    </div>
  );
};
export default FormInput;
