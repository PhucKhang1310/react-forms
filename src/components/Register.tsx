import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import type { RegisterFormData } from "../app/types";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: RegisterFormData) => {
    dispatch({ type: "account/addAccount", payload: data });
    navigate("/");
  };
  const onCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-1/2 w-1/5 flex-col items-center justify-center gap-5 rounded-sm border border-[#DCD7C9] bg-white shadow-md">
        <h2 className="text-xl font-semibold">Đăng ký</h2>
        <RegisterForm onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </div>
  );
};
export default Register;
