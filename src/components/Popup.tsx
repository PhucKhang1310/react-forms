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
    <PopupOverlay title={message}>
      <div className="flex justify-center gap-20">
        <button
          className="w-30 rounded-sm border border-gray-200 hover:cursor-pointer"
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          className="main-color w-30 rounded-sm hover:cursor-pointer"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </PopupOverlay>
  );
};
export default Popup;
