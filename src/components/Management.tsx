import { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import Table from "./Table";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PopupForm from "./PopupForm";
import type { FormData } from "../app/types";

type PopupType = "delete" | "status" | null;
type FormType = "add" | "edit" | null;

const Management = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const [popupType, setPopupType] = useState<PopupType>(null);
  const [formType, setFormType] = useState<FormType>(null);
  const [pendingItem, setPendingItem] = useState<any>(null);

  const TableData = useAppSelector((state) => state.account.accounts);
  const dispatch = useAppDispatch();

  const enableEdit = (item: any) => {
    setFormType("edit");
    setPendingItem(item);
    setCreatingAccount(true);
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

  const createAccount = () => {
    setFormType("add");
    setCreatingAccount(true);
  };

  const handleSubmit = (data: FormData) => {
    if (formType === "edit") {
      dispatch({
        type: "account/editAccount",
        payload: {
          id: pendingItem.id,
          data: data,
        },
      });
    } else {
      dispatch({
        type: "account/addAccount",
        payload: data,
      });
    }
    setCreatingAccount(false);
    setPendingItem(null);
  };

  const onCancel = () => {
    setCreatingAccount(false);
    setPendingItem(null);
  }

  const deleteMessage = `Are you sure you want to delete ${pendingItem?.name}?`;
  const statusMessage = `Are you sure you want to change the status of ${pendingItem?.name}?`;

  return (
    <div>
      {creatingAccount && (
        <PopupForm
          title={formType === "edit" ? "Edit account" : "Add new account"}
          defaultValues={formType === "edit" ? pendingItem : {}}
          buttonLabel={
            formType === "edit" ? "Update account" : "Create account"
          }
          onSubmit={handleSubmit}
          onCancel={onCancel}
        />
      )}
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
            <button
              className="text-md h-10 w-25 bg-[#dcd7c9] font-bold hover:cursor-pointer hover:opacity-90 active:opacity-70"
              onClick={createAccount}
            >
              Thêm
            </button>
          </div>
          <Table
            items={TableData}
            onToggle={(item) => openPopup("status", item)}
            onDelete={(item) => openPopup("delete", item)}
            onEdit={(item) => enableEdit(item)}
          />
        </div>
      </div>
    </div>
  );
};
export default Management;
