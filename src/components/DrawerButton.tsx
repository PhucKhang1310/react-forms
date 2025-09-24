interface DrawerButtonProps {
  label: string;
  variant?: "active" | "inactive";
}

const DrawerButton = ({ label, variant = "inactive" }: DrawerButtonProps) => {
  return (
    <button
      className={`${variant === "active" ? "bg-[#DCD7C9] text-[#212727]" : "bg-none text-[#DCD7C9]"} box-border h-1/4 w-full truncate rounded-sm border-none pl-5 text-left font-sans text-sm font-bold outline-none hover:cursor-pointer hover:bg-[#DCD7C9] hover:text-[#212727] hover:opacity-90 active:opacity-70`}
    >
      {label}
    </button>
  );
};
export default DrawerButton;
