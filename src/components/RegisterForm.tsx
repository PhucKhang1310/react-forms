import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterFormData } from "../app/types";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../app/hooks";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema as any),
  });

  const dispatch = useAppDispatch();
  const onSubmit = (data: RegisterFormData) => {
    dispatch({ type: "account/addAccount", payload: data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-5 px-10"
    >
      <FormInput<RegisterFormData>
        type="text"
        label="Tên tài khoản"
        name="name"
        placeholder="Nguyễn Văn A"
        register={register}
        error={errors.name}
      />
      <FormInput<RegisterFormData>
        type="email"
        label="Email"
        name="email"
        placeholder="example@email.com"
        register={register}
        error={errors.email}
      />
      <FormInput<RegisterFormData>
        type="password"
        label="Mật khẩu"
        name="password"
        placeholder="Nhập mật khẩu"
        register={register}
        error={errors.password}
      />
      <FormInput<RegisterFormData>
        type="password"
        label="Xác nhận mật khẩu"
        name="passwordConfirm"
        placeholder="Nhập lại mật khẩu"
        register={register}
        error={errors.passwordConfirm}
      />
      <FormButton label="Đăng ký" />
    </form>
  );
};
export default RegisterForm;
