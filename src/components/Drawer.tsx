import DrawerButton from "./DrawerButton";

const Drawer = () => {
  return (
    <div className="h-screen w-1/5 bg-[#3F4E4F]">
      <div className="flex h-1/5 flex-col gap-5 px-5 py-5">
        <DrawerButton label="Danh sách người dùng" variant="active" />
        <DrawerButton label="Danh sách sản phẩm" variant="inactive" />
      </div>
    </div>
  );
};
export default Drawer;
