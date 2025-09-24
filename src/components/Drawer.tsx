import DrawerButton from "./DrawerButton";

interface DrawerProps {
  isOpen?: boolean;
}

const Drawer = ({ isOpen }: DrawerProps) => {
  return (
    <div
      className={`h-screen bg-[#3F4E4F] transition-all duration-300 ease-in-out ${isOpen ? "w-1/5" : "w-0"} `}
    >
      <div
        className={`h-1/5 min-w-0 flex-col gap-5 px-5 py-5 ${isOpen ? "flex" : "hidden"}`}
      >
        <DrawerButton label="Danh sách người dùng" variant="active" />
        <DrawerButton label="Danh sách sản phẩm" variant="inactive" />
      </div>
    </div>
  );
};
export default Drawer;
