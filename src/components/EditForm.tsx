import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditSchema, type EditFormData } from "../app/types";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

interface EditFormProps {
  defaultValues: { name: string; email: string; password: string };
  onCancel?: () => void;
  onSubmit: (data: EditFormData) => void;
  currentEmails: string[];
}

const EditForm = ({
  defaultValues = { name: "", email: "", password: "" },
  onCancel,
  onSubmit,
  currentEmails,
}: EditFormProps) => {
  const editSchema = EditSchema(currentEmails);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({ resolver: zodResolver(editSchema as any) });

  return (
    <form
      className="flex w-3/4 flex-col items-start gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput<EditFormData>
        type="text"
        label="Tên tài khoản"
        name="name"
        placeholder="Nguyễn Văn A"
        register={register}
        error={errors.name}
        defaultValue={defaultValues.name}
      />
      <FormInput<EditFormData>
        type="email"
        label="Email"
        name="email"
        placeholder="nguyenvana@example.com"
        register={register}
        error={errors.email}
        defaultValue={defaultValues.email}
      />
      <FormInput<EditFormData>
        type="text"
        label="Old Password"
        name="password"
        placeholder="********"
        register={register}
        error={errors.password}
        defaultValue={defaultValues.password}
        readOnly
      />
      <FormInput<EditFormData>
        type="text"
        label="New Password"
        name="newPassword"
        placeholder="********"
        register={register}
        error={errors.newPassword}
      />
      <div className="flex w-full justify-around">
        <FormButton
          label="Đóng"
          type="button"
          onClick={onCancel}
          variant="bordered"
        />
        <FormButton label="Lưu" />
      </div>
    </form>
  );
};
export default EditForm;
