interface PopupOverlayProps {
  children?: React.ReactNode;
  title: string;
}

const PopupOverlay = ({ children, title }: PopupOverlayProps) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="flex flex-col min-w-min items-center justify-center rounded-sm border border-[#DCD7C9] bg-white box-border p-15">
        <h1 className="mb-10 font-semibold text-lg">{title}</h1>
        {children}
      </div>
    </div>
  );
};
export default PopupOverlay;
