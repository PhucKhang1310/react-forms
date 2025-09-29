interface PopupOverlayProps {
    children?: React.ReactNode;
}

const PopupOverlay = ({ children }: PopupOverlayProps) => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      {children}
    </div>
  )
}
export default PopupOverlay