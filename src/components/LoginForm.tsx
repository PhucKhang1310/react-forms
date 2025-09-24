import FormButton from "./FormButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useForm } from "react-hook-form";
import { type LoginFormData, LoginSchema } from "../app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema as any) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.account.currentAccount);
  const loginError = useAppSelector((state) => state.account.loginError);
  const [hasFailed, setHasFailed] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    dispatch({ type: "account/login", payload: data });
    if (!isLoggedIn) {
      setHasFailed(true);
    }
  };

  const registerAccount = () => {
    navigate("/register");
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/management");
    }
  }, [isLoggedIn]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-5 px-10"
    >
      <FormInput<LoginFormData>
        type="text"
        label="Tên tài khoản"
        name="name"
        placeholder="Nguyễn Văn A"
        register={register}
        error={errors.name}
      />
      <FormInput<LoginFormData>
        type="password"
        label="Mật khẩu"
        name="password"
        placeholder="Nhập mật khẩu"
        register={register}
        error={errors.password}
      />
      {hasFailed && <span className="text-red-500">{loginError}</span>}
      <div className="flex w-full justify-around">
        <FormButton label="Đăng nhập" />
        <FormButton label="Đăng ký" variant="bordered" type="button" onClick={registerAccount} />
      </div>
    </form>
  );
};
export default LoginForm;
