import type { RegisterFields } from "../app/types";
import PopupOverlay from "./PopupOverlay";
import RegisterAntForm from "./RegisterAntForm";

interface PopupRegisterProps {
  onSubmit?: (data: RegisterFields) => void;
  onCancel?: () => void;
}

const PopupRegister = ({ onCancel, onSubmit }: PopupRegisterProps) => {
  return (
    <PopupOverlay title="Đăng ký tài khoản">
      <RegisterAntForm onCancel={onCancel} onSubmit={onSubmit} />
    </PopupOverlay>
  );
};
export default PopupRegister;
