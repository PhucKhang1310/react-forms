import { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ManagementButton from "./ManagementButton";
import { useNavigate } from "react-router-dom";
import ItemTable from "./ItemTable";
import type { ItemOptions } from "../app/itemSlice";

type PopupType = "delete" | "status" | null;

const ItemManagement = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>(null);
  const [pendingItem, setPendingItem] = useState<ItemOptions | null>(null);

  const TableData = useAppSelector((state) => state.item.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.account.currentAccount);

  const logout = () => {
    navigate("/");
    dispatch({ type: "account/logout" });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const openPopup = (type: PopupType, item: any) => {
    setPopupType(type);
    setPendingItem(item);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPendingItem(null);
    setPopupType(null);
  };

  const onConfirm = () => {
    if (popupType === "delete") deleteItem();
    closePopup();
  };

  const deleteItem = () => {
    if (!pendingItem) return;
    dispatch({
      type: "item/deleteItem",
      payload: { id: pendingItem.id },
    });
  };

  const deleteMessage = `Xóa tài khoản ${pendingItem?.name}?`;
  const statusAction = `${pendingItem ? "Hủy kích hoạt" : "Kích hoạt"}`;
  const statusMessage = `${statusAction} tài khoản ${pendingItem?.name}?`;

  return (
    <div className="bg-white">
      {popupVisible && (
        <Popup
          message={popupType === "status" ? statusMessage : deleteMessage}
          confirmText={popupType === "status" ? statusAction : "Xóa"}
          onConfirm={onConfirm}
          onCancel={closePopup}
        />
      )}
      <NavBar username={currentUser?.name} onToggleDrawer={toggleDrawer} />
      <div className="flex">
        <Drawer isOpen={drawerOpen} />
        <div className="flex w-full flex-col p-5">
          <div className="flex justify-between pb-3">
            <h2 className="text-lg font-bold">Danh sách</h2>
            <div className="flex gap-5">
              <ManagementButton label="Thêm" onClick={() => {}} />
              <ManagementButton label="Logout" variant="red" onClick={logout} />
            </div>
          </div>
          <ItemTable
            data={TableData}
            onDelete={(record) => openPopup("delete", record)}
          />
        </div>
      </div>
    </div>
  );
};
export default ItemManagement;
