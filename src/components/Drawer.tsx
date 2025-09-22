const Drawer = () => {
  return (
    <div className="w-1/5 h-screen bg-[#3F4E4F]">
      <div className="px-5 py-5 flex flex-col gap-5 h-1/5">
        <button className="w-full rounded-sm h-1/4 text-left font-bold text-sm font-sans border-none outline-none box-border pl-5 bg-[#DCD7C9] text-[#212727]">
          Danh sách người dùng
        </button>
        <button className="w-full rounded-sm h-1/4 text-left font-bold text-sm font-sans border-none outline-none box-border pl-5 bg-none text-[#DCD7C9]">
          Danh sách sản phẩm
        </button>
      </div>
    </div>
  );
};
export default Drawer;
