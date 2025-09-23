import { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import Table from "./Table";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type PopupType = "delete" | "status" | null;

const Management = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>(null);
  const [pendingItem, setPendingItem] = useState<any>(null);
  const TableData = useAppSelector((state) => state.account.accounts);
  const dispatch = useAppDispatch();

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
    if (popupType === "delete") deleteAccount();
    else if (popupType === "status") updateStatus();
    closePopup();
  };

  const updateStatus = () => {
    dispatch({
      type: "account/toggleAccountStatus",
      payload: { id: pendingItem.id },
    });
  };

  const deleteAccount = () => {
    dispatch({
      type: "account/deleteAccount",
      payload: { id: pendingItem.id },
    });
  };

  const deleteMessage = `Are you sure you want to delete ${pendingItem?.name}?`;
  const statusMessage = `Are you sure you want to change the status of ${pendingItem?.name}?`;

  return (
    <div>
      {popupVisible && (
        <Popup
          message={popupType === "status" ? statusMessage : deleteMessage}
          confirmText={popupType === "status" ? "Update" : "Delete"}
          cancelText="Cancel"
          onConfirm={onConfirm}
          onCancel={closePopup}
        />
      )}
      <NavBar />
      <div className="flex">
        <Drawer />
        <div className="flex w-full flex-col p-5">
          <div className="flex justify-between pb-3">
            <h2 className="text-lg font-bold">Danh sách</h2>
            <button className="h-10 w-25 bg-[#dcd7c9] text-lg font-bold">
              Add
            </button>
          </div>
          <Table
            items={TableData}
            onToggle={(item) => openPopup("status", item)}
            onDelete={(item) => openPopup("delete", item)}
          />
        </div>
      </div>
    </div>
  );
};
export default Management;
