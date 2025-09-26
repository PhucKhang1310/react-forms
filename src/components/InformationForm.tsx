import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterFormData } from "../app/types";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../app/hooks";

interface RegisterFormProps {
  onCancel?: () => void;
  //   onSubmit: (data: RegisterFormData) => void;
}

const InformationForm = ({ onCancel }: RegisterFormProps) => {
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

  const isEditing = false;

  return (
    <form
      //   onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-5 px-10"
    >
      <FormInput<RegisterFormData>
        type="text"
        label="Tên tài khoản"
        name="name"
        placeholder="Nguyễn Văn A"
        register={register}
        error={errors.name}
        defaultValue="200"
        readOnly
      />
      <FormInput<RegisterFormData>
        type="email"
        label="Email"
        name="email"
        placeholder="example@email.com"
        register={register}
        error={errors.email}
        defaultValue="200"
        readOnly
      />
      <FormInput<RegisterFormData>
        type="password"
        label="Mật khẩu"
        name="password"
        placeholder="Nhập mật khẩu"
        register={register}
        error={errors.password}
        readOnly
      />
      <FormInput<RegisterFormData>
        type="password"
        label="Xác nhận mật khẩu"
        name="passwordConfirm"
        placeholder="Nhập lại mật khẩu"
        register={register}
        defaultValue="200"
        error={errors.passwordConfirm}
        readOnly
      />
      {!isEditing && (
        <>
          <FormInput<RegisterFormData>
            type="text"
            label="Ngày cập nhật"
            placeholder="dd/mm/yyyy"
            readOnly
          />
          <div className="` self-start">
            <input type="checkbox" checked readOnly />
            Đã kích hoạt
          </div>
        </>
      )}
      <div className="flex w-full justify-around">
        <FormButton
          label="Đóng"
          type="button"
          onClick={onCancel}
          variant="bordered"
        />
        {!isEditing && (
          <FormButton label="Sửa" type="button" onClick={() => {}} />
        )}
        {isEditing && <FormButton label="Đăng ký" />}
      </div>
    </form>
  );
};
export default InformationForm;
