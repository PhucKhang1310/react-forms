import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PopupForm from "./PopupForm";
import type { EditFormData, RegisterFormData } from "../app/types";
import ManagementButton from "./ManagementButton";
import type { AccountOptions } from "../app/accountSlice";
import PopupRegister from "./PopupRegister";
import { useNavigate } from "react-router-dom";
import AntTable from "./AntTable";

type PopupType = "delete" | "status" | null;

const Management = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [editingAccount, setEditingAccount] = useState(false);
  const [viewingAccount, setViewingAccount] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>(null);
  const [pendingItem, setPendingItem] = useState<AccountOptions | null>(null);
  
  const TableData = useAppSelector((state) => state.account.accounts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.account.currentAccount);
  const currentEmails = useAppSelector((state) =>
    state.account.accounts
      .map((acc) => acc.email)
      .filter((email) => email !== pendingItem?.email),
  );

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
    if (popupType === "delete") deleteAccount();
    else if (popupType === "status") updateStatus();
    closePopup();
  };

  const updateStatus = () => {
    if (!pendingItem) return;
    dispatch({
      type: "account/toggleAccountStatus",
      payload: { id: pendingItem.id },
    });
  };

  const deleteAccount = () => {
    if (!pendingItem) return;
    dispatch({
      type: "account/deleteAccount",
      payload: { id: pendingItem.id },
    });
  };

  const editAccount = (data: EditFormData) => {
    if (!pendingItem) return;
    dispatch({
      type: "account/editAccount",
      payload: { id: pendingItem.id, data: data },
    });
    closeForms();
  };

  const createAccount = (data: RegisterFormData) => {
    dispatch({ type: "account/addAccount", payload: data });
    closeForms();
  };

  const showAccountForm = () => {
    setCreatingAccount(true);
  };

  const showEditForm = (account: AccountOptions) => {
    setViewingAccount(true);
    setEditingAccount(true);
    setPendingItem(account);
  };

  const viewAccountForm = (account: AccountOptions) => {
    setPendingItem(account);
    setViewingAccount(true);
  }

  const onEdit = () => {
    setEditingAccount(true);
  }

  const closeForms = () => {
    setViewingAccount(false);
    setCreatingAccount(false);
    setEditingAccount(false);
  };

  const deleteMessage = `Xóa tài khoản ${pendingItem?.name}?`;
  const statusAction = `${pendingItem?.status ? "Hủy kích hoạt" : "Kích hoạt"}`;
  const statusMessage = `${statusAction} tài khoản ${pendingItem?.name}?`;

  useEffect(() => {
    if (!currentUser) {
      // navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="bg-white">
      {creatingAccount && (
        <PopupRegister
          title="Tạo tài khoản"
          onCancel={closeForms}
          onSubmit={createAccount}
        />
      )}
      {viewingAccount && pendingItem &&(
        <PopupForm
          account={pendingItem}
          title="Chỉnh sửa tài khoản"
          onCancel={closeForms}
          onSubmit={editAccount}
          currentEmails={currentEmails}
          isEditing={editingAccount}
          onEdit={onEdit}
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
      <NavBar username={currentUser?.name} onToggleDrawer={toggleDrawer} />
      <div className="flex">
        <Drawer isOpen={drawerOpen} />
        <div className="flex w-full flex-col p-5">
          <div className="flex justify-between pb-3">
            <h2 className="text-lg font-bold">Danh sách</h2>
            <div className="flex gap-5">
              <ManagementButton label="Thêm" onClick={showAccountForm} />
              <ManagementButton label="Logout" variant="red" onClick={logout} />
            </div>
          </div>
          {/* <Table
            items={TableData}
            onToggle={(item) => openPopup("status", item)}
            onDelete={(item) => openPopup("delete", item)}
            onEdit={(item) => showEditForm(item)}
          /> */}
          <AntTable
            data={TableData}
            onToggle={(record) => openPopup("status", record)}
            onEdit={(record) => showEditForm(record)}
            onDelete={(record) => openPopup("delete", record)}
            onView={(record) => viewAccountForm(record)}
          />
        </div>
      </div>
    </div>
  );
};
export default Management;
