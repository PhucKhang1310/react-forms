import type { ItemFields } from "../app/types";
import ItemForm from "./ItemForm";
import PopupOverlay from "./PopupOverlay";

interface PopupItemFormProps {
  onSubmit: (item: ItemFields) => void;
  initialValues?: ItemFields;
  onClose: () => void;
  label?: string;
}

const PopupItemForm = ({ onSubmit, initialValues, onClose, label }: PopupItemFormProps) => {
  return (
    <PopupOverlay>
      <div className="flex h-150 w-120 flex-col items-center justify-center rounded-sm border border-[#DCD7C9] bg-white">
        <h1>Title</h1>
        <ItemForm onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} label={label}/>
      </div>
    </PopupOverlay>
  );
};
export default PopupItemForm;
