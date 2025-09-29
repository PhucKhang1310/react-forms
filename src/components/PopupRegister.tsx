import type { RegisterFormData } from "../app/types";
import PopupOverlay from "./PopupOverlay";
import RegisterForm from "./RegisterForm";

interface PopupRegisterProps {
  title: string;
  onCancel?: () => void;
  onSubmit: (data: RegisterFormData) => void;
}

const PopupRegister = ({ title, onCancel, onSubmit }: PopupRegisterProps) => {
  return (
    <PopupOverlay>
      <div className="flex h-150 w-120 flex-col items-center justify-center rounded-sm border border-[#DCD7C9] bg-white">
        <h1 className="mb-10 font-semibold">{title}</h1>
        <RegisterForm onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </PopupOverlay>
  );
};
export default PopupRegister;
