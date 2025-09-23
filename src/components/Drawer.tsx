const Drawer = () => {
  return (
    <div className="h-screen w-1/5 bg-[#3F4E4F]">
      <div className="flex h-1/5 flex-col gap-5 px-5 py-5">
        <button className="box-border h-1/4 w-full rounded-sm border-none bg-[#DCD7C9] pl-5 text-left font-sans text-sm font-bold text-[#212727] outline-none">
          Danh sách người dùng
        </button>
        <button className="box-border h-1/4 w-full rounded-sm border-none bg-none pl-5 text-left font-sans text-sm font-bold text-[#DCD7C9] outline-none">
          Danh sách sản phẩm
        </button>
      </div>
    </div>
  );
};
export default Drawer;
