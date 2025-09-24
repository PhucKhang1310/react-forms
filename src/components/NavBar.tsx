const NavBar = () => {
  return (
    <div className="box-border flex h-10 w-full flex-row items-center justify-between bg-[#3f3f3f] px-10 py-7">
      <div className="menu-icon aspect-square h-10 bg-contain bg-center" />
      <div className="flex flex-row items-center gap-5">
        <p className="text-white">username</p>
        <div className="h-10 w-10 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};
export default NavBar;
