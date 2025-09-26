import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditSchema, type EditFormData } from "../app/types";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

interface EditFormProps {
  defaultValues: { name: string; email: string; password: string };
  dateModified?: string;
  status?: boolean;
  isEditing?: boolean;
  onCancel?: () => void;
  onSubmit: (data: EditFormData) => void;
  onEdit?: () => void;
  currentEmails: string[];
}

const EditForm = ({
  defaultValues = { name: "", email: "", password: "" },
  onCancel,
  onSubmit,
  onEdit,
  currentEmails,
  isEditing,
  dateModified,
  status,
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
        readOnly={!isEditing}
      />
      <FormInput<EditFormData>
        type="email"
        label="Email"
        name="email"
        placeholder="nguyenvana@example.com"
        register={register}
        error={errors.email}
        defaultValue={defaultValues.email}
        readOnly={!isEditing}
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
      {isEditing && (
        <FormInput<EditFormData>
          type="password"
          label="New Password"
          name="newPassword"
          placeholder="********"
          register={register}
          error={errors.newPassword}
        />
      )}
      {!isEditing && (
        <>
          <FormInput
            type="text"
            label="Date Modified"
            placeholder="dd/mm/yyyy"
            defaultValue={dateModified}
            readOnly
          />
          <div className="flex gap-4 self-start">
            <input
              type="checkbox"
              checked={status}
              className="check-icon mt-0.75 rounded border border-gray-400 bg-gray-300 bg-none bg-cover bg-no-repeat ring-0 checked:bg-white"
            />
            {status ? "Đã kích hoạt" : "Chưa kích hoạt"}
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
        {isEditing ? (
          <FormButton label="Lưu" />
        ) : (
          <FormButton label="Sửa" type="button" onClick={onEdit} />
        )}
      </div>
    </form>
  );
};
export default EditForm;
