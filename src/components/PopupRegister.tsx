import type { RegisterFormData } from "../app/types";
import RegisterForm from "./RegisterForm";

interface PopupRegisterProps {
  title: string;
  onCancel?: () => void;
  onSubmit: (data: RegisterFormData) => void;
}

const PopupRegister = ({ title, onCancel, onSubmit }: PopupRegisterProps) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="flex h-150 w-120 flex-col items-center justify-center rounded-sm border border-[#DCD7C9] bg-white">
        <h1 className="mb-10 font-semibold">{title}</h1>
        <RegisterForm onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </div>
  );
};
export default PopupRegister;
