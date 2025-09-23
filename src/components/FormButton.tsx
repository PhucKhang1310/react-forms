interface FormButtonProps {
  label: string;
}

const FormButton = ({ label }: FormButtonProps) => {
  return (
    <button
      className="mt-5 box-border w-auto rounded-md bg-[#dcd7c9] px-5 py-2 hover:cursor-pointer hover:opacity-90 active:opacity-50"
      type="submit"
    >
      {label}
    </button>
  );
};
export default FormButton;
