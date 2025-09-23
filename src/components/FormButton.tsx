interface FormButtonProps {
  label: string;
  type?: "button" | "submit";
  variant?: "bordered" | "filled";
  onClick?: () => void;
}

const FormButton = ({ label, type = "submit", variant = "filled", onClick }: FormButtonProps) => {
  return (
    <button
      className={`${variant === "bordered" ? "border border-gray-200" : "bg-[#dcd7c9]"} mt-5 box-border w-2/5 rounded-md  px-5 py-2 hover:cursor-pointer hover:opacity-90 active:opacity-50`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default FormButton;
