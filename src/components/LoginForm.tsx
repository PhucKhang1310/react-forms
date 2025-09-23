import FormButton from "./FormButton";
import { useAppDispatch } from "../app/hooks";
import { useForm } from "react-hook-form";
import { type FormData, UserSchema } from "../app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(UserSchema as any) });
  const dispatch = useAppDispatch();
  const onSubmit = (data: FormData) => {
    dispatch({ type: "account/login", payload: data });
  };
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

      <FormButton label="Đăng nhập" />
    </form>
  );
};
export default LoginForm;
