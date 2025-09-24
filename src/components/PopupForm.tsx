import type { EditFormData } from "../app/types";
import EditForm from "./EditForm";

interface PopupFormProps {
  title: string;
  defaultValues: { name: string; email: string; password: string };
  onCancel?: () => void;
  onSubmit: (data: EditFormData) => void;
  currentEmails: string[];
}

const PopupForm = ({ title, defaultValues, onCancel, onSubmit, currentEmails }: PopupFormProps) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="flex h-150 w-120 flex-col items-center justify-center rounded-sm border border-[#DCD7C9] bg-white">
        <h1 className="mb-10 font-semibold">{title}</h1>
        <EditForm defaultValues={defaultValues} onCancel={onCancel} onSubmit={onSubmit} currentEmails={currentEmails} />
      </div>
    </div>
  );
};
export default PopupForm;
