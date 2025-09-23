interface PopupProps {
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onUnfocus?: () => void;
}

const Popup = ({
  onConfirm,
  onCancel,
  onUnfocus,
  message = "Do you really want to do this?",
  confirmText = "Yes",
  cancelText = "No",
}: PopupProps) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]" onClick={onUnfocus}>
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
    </div>
  );
};
export default Popup;
