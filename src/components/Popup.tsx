interface PopupProps{
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Popup = ({ onConfirm, onCancel, message = "Do you really want to do this?", confirmText= "Yes", cancelText= "No" }: PopupProps) => {

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-10 absolute top-0 left-0">
      <div className="flex flex-col w-xl h-52 rounded-md bg-white justify-center">
        <div className="flex justify-center items-center p-10">
          <h3>{message}</h3>
        </div>
        <div className="flex justify-center gap-20">
          <button className="border border-gray-200 w-1/4 rounded-sm hover:cursor-pointer" onClick={onCancel}>{cancelText}</button>
          <button className="main-color w-1/4 rounded-sm hover:cursor-pointer" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
