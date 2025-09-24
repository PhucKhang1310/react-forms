import { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import Table from "./Table";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PopupForm from "./PopupForm";
import type { FormData } from "../app/types";
import Error from "./Error";
import ManagementButton from "./ManagementButton";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);

  const logout = () => {
    navigate("/");
    dispatch({ type: "account/logout" });
  };

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
  };

  const deleteMessage = `Xóa tài khoản ${pendingItem?.name}?`;
  const statusAction = `${pendingItem?.status ? "Hủy kích hoạt" : "Kích hoạt"}`;
  const statusMessage = `${statusAction} tài khoản ${pendingItem?.name}?`;

  if (!isLoggedIn) {
    return <Error />;
  }

  return (
    <div>
      {creatingAccount && (
        <PopupForm
          title={formType === "edit" ? "Thay đổi thông tin" : "Thêm tài khoản"}
          defaultValues={formType === "edit" ? pendingItem : {}}
          buttonLabel={formType === "edit" ? "Thay đổi" : "Tạo"}
          onSubmit={handleSubmit}
          onCancel={onCancel}
        />
      )}
      {popupVisible && (
        <Popup
          message={popupType === "status" ? statusMessage : deleteMessage}
          confirmText={popupType === "status" ? statusAction : "Xóa"}
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
            <div className="flex gap-5">
              <ManagementButton label="Thêm" onClick={createAccount} />
              <ManagementButton label="Logout" variant="red" onClick={logout} />
            </div>
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
