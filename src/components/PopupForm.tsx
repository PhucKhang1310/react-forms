import FormButton from "./FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterFormData } from "../app/types";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

interface PopupFormProps {
  title: string;
  defaultValues?: {
    name: string;
    email: string;
  };
  buttonLabel?: string;
  onSubmit: (data: RegisterFormData) => void;
  onCancel?: () => void;
}

const PopupForm = ({
  defaultValues = { name: "", email: "" },
  buttonLabel = "Thêm tài khoản",
  onSubmit,
  onCancel,
  title,
}: PopupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterSchema as any) });

  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="flex h-100 w-120 flex-col items-center justify-center rounded-sm border border-[#DCD7C9] bg-white">
        <h1 className="mb-10 font-semibold">{title}</h1>
        <form
          className="flex w-3/4 flex-col items-start gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput<RegisterFormData>
            type="text"
            label="Tên tài khoản"
            name="name"
            placeholder="Nguyễn Văn A"
            register={register}
            error={errors.name}
            defaultValue={defaultValues.name}
          />
          <FormInput<RegisterFormData>
            type="email"
            label="Email"
            name="email"
            placeholder="nguyenvana@example.com"
            register={register}
            error={errors.email}
            defaultValue={defaultValues.email}
          />
          <div className="flex w-full justify-around">
            <FormButton
              label="Hủy"
              type="button"
              onClick={onCancel}
              variant="bordered"
            />
            <FormButton label={buttonLabel} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default PopupForm;
