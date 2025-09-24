import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterFormData } from "../app/types";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../app/hooks";

interface RegisterFormProps {
  onCancel?: () => void;
  onSubmit: (data: RegisterFormData) => void;
}

const RegisterForm = ({ onCancel, onSubmit }: RegisterFormProps) => {
  const currentEmails = useAppSelector((state) =>
    state.account.accounts.map((account) => account.email),
  );
  const RegSchema = RegisterSchema(currentEmails);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegSchema as any),
  });

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
      <div className="flex w-full justify-around">
        <FormButton
          label="Đóng"
          type="button"
          onClick={onCancel}
          variant="bordered"
        />
        <FormButton label="Đăng ký" />
      </div>
    </form>
  );
};
export default RegisterForm;
