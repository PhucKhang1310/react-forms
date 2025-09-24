import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  defaultValue?: string;
}

const FormInput = <T extends FieldValues>({
  label,
  type,
  placeholder,
  name,
  register,
  error,
  defaultValue,
}: FormFieldProps<T>) => {
  return (
    <div className="flex w-full flex-col">
      <h1>{label}</h1>
      <input
        className="h-8 w-full rounded-md border border-[#DCD7C9] shadow-md placeholder:opacity-30 focus:ring-1 focus:ring-[#DCD7C9] focus:outline-none active:outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name as any)}
        defaultValue={defaultValue}
      />
      {error && (
        <span className="text-sm text-red-600 italic">{error.message}</span>
      )}
    </div>
  );
};
export default FormInput;
