import FormButton from "./FormButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useForm } from "react-hook-form";
import { type FormData, UserSchema } from "../app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(UserSchema as any) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: FormData) => {
    dispatch({ type: "account/login", payload: data });
  };

  const [isFirstRender, setIsFirstRender] = useState(true);
  const loginSuccess = useAppSelector((state) => state.account.isLoggedIn);

  useEffect(() => {
    setIsFirstRender(false);
    if (loginSuccess) {
      navigate("/management");
    }
  }, [loginSuccess]);

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-5 px-10"
    >
      <FormInput
        type="text"
        label="Tên tài khoản"
        name="name"
        placeholder="Nguyễn Văn A"
        register={register}
        error={errors.name}
      />
      <FormInput
        type="email"
        label="Email"
        name="email"
        placeholder="nguyenvana@example.com"
        register={register}
        error={errors.email}
      />
      {!isFirstRender && (
        <span className="text-red-500">
          Tên tài khoản hoặc email không đúng
        </span>
      )}
      <FormButton label="Đăng nhập" />
    </form>
  );
};
export default LoginForm;
