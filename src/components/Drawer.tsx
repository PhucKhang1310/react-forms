import { useLocation, useNavigate } from "react-router-dom";
import DrawerButton from "./DrawerButton";

interface DrawerProps {
  isOpen?: boolean;
}

const Drawer = ({ isOpen }: DrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const drawerItems = [
    { label: "Danh sách người dùng", path: "/management" },
    { label: "Danh sách sản phẩm", path: "/items" },
  ];

  return (
    <div
      className={`h-screen bg-[#3F4E4F] transition-all duration-300 ease-in-out ${isOpen ? "w-1/5" : "w-0"} `}
    >
      <div
        className={`h-1/5 min-w-0 flex-col gap-5 px-5 py-5 ${isOpen ? "flex" : "hidden"}`}
      >
        {drawerItems.map((item) => (
          <DrawerButton
            key={item.path}
            label={item.label}
            variant={isActive(item.path) ? "active" : "inactive"}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
};
export default Drawer;
