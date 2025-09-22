
const NavBar = () => {
  return (
    <div className="w-full h-10 flex flex-row justify-between items-center box-border px-10 py-7 bg-[#3f3f3f]">
      <div className="h-10 menu-icon aspect-square bg-contain bg-center"/>
      <div className="flex flex-row items-center gap-5">
        <p className="text-white">username</p>
        <div className="w-10 h-10 rounded-full bg-gray-300"/>
      </div>
    </div>
  );
};
export default NavBar;
