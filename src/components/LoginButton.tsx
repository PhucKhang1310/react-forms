interface LoginButtonProps {
  label: string;
}

const LoginButton = ({ label }: LoginButtonProps) => {
  return (
    <button
      className="h-8 w-1/2 rounded-md bg-[#dcd7c9] hover:cursor-pointer hover:opacity-90 active:opacity-50 mt-5"
      type="submit"
    >
      {label}
    </button>
  );
};
export default LoginButton;
