import PopupOverlay from "./PopupOverlay";

interface PopupProps {
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Popup = ({
  onConfirm,
  onCancel,
  message = "Message",
  confirmText = "Có",
  cancelText = "Đóng",
}: PopupProps) => {
  return (
    <PopupOverlay>
      <div className="flex h-52 w-xl flex-col justify-center rounded-md bg-white">
        <div className="flex items-center justify-center p-10">
          <h3>{message}</h3>
        </div>
        <div className="flex justify-center gap-20">
          <button
            className="w-1/4 rounded-sm border border-gray-200 hover:cursor-pointer"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="main-color w-1/4 rounded-sm hover:cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </PopupOverlay>
  );
};
export default Popup;
