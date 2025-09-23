interface LoginButtonProps {
  label: string;
}

const LoginButton = ({ label }: LoginButtonProps) => {
  return (
    <button
      className="mt-5 box-border w-auto px-5 py-2 rounded-md bg-[#dcd7c9] hover:cursor-pointer hover:opacity-90 active:opacity-50"
      type="submit"
    >
      {label}
    </button>
  );
};
export default LoginButton;
