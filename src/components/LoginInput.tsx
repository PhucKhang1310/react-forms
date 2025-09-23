interface LoginInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: LoginInputProps) => {
  return (
    <div className="flex flex-col justify-start gap-1 w-full">
      <label>{label}</label>
      <input
        className="h-6 w-full rounded-md border border-[#DCD7C9] px-2 shadow-md placeholder:opacity-30 focus:ring-1 focus:ring-[#DCD7C9] focus:outline-none active:outline-none"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
export default LoginInput;
