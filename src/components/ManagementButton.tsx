interface ManagementButtonProps {
  label: string;
  onClick: () => void;
  variant?: "beige" | "red";
}

const ManagementButton = ({
  label,
  onClick,
  variant = "beige",
}: ManagementButtonProps) => {
  return (
    <button
      className={`text-md h-10 w-25 font-bold hover:cursor-pointer hover:opacity-90 active:opacity-70 ${
        variant === "beige" ? "bg-[#dcd7c9]" : "bg-red-400"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default ManagementButton;
