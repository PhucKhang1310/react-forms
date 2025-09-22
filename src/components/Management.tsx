import { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import Table from "./Table";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Management = () => {
  const [statusPopupVisible, setStatusPopupVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);
  const TableData = useAppSelector((state) => state.account.accounts);
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    updateStatus();
    setStatusPopupVisible(false);
  };

  const onCancel = () => {
    setPendingItem(null);
    setStatusPopupVisible(false);
  };

  const updateStatus = () => {
    dispatch({
      type: "account/toggleAccountStatus",
      payload: { id: pendingItem.id },
    });
  };

  const onToggle = (item: any) => {
    setStatusPopupVisible(true);
    setPendingItem(item);
  };

  const deleteAccount = () => {
    dispatch({
      type: "account/deleteAccount",
      payload: { id: pendingItem.id },
    });
  };

  const onDelete = (item: any) => {
    setPendingItem(item);
    setDeletePopupVisible(true);
  };

  const onDeleteConfirm = () => {
    deleteAccount();
    setDeletePopupVisible(false);
  };

  const onDeleteCancel = () => {
    setPendingItem(null);
    setDeletePopupVisible(false);
  };

  const deleteMessage = `Are you sure you want to delete ${pendingItem?.name}?`;
  const statusMessage = `Are you sure you want to change the status of ${pendingItem?.name}?`;

  return (
    <div>
      {deletePopupVisible && (
        <Popup
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={onDeleteConfirm}
          onCancel={onDeleteCancel}
          message={deleteMessage}
        />
      )}
      {statusPopupVisible && (
        <Popup
          message={statusMessage}
          confirmText="Update"
          cancelText="Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
      <NavBar />
      <div className="flex">
        <Drawer />
        <div className="flex flex-col p-5 w-full">
          <div className="flex justify-between pb-3">
            <h2 className="text-lg font-bold">Danh sách</h2>
            <button className="bg-[#dcd7c9] w-25 h-10 text-lg font-bold">
              Add
            </button>
          </div>
          <Table items={TableData} onToggle={onToggle} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};
export default Management;
