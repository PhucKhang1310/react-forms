import { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import Popup from "./Popup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ManagementButton from "./ManagementButton";
import { useNavigate } from "react-router-dom";
import ItemTable from "./ItemTable";
import type { ItemOptions } from "../app/itemSlice";
import type { ItemFields } from "../app/types";
import ItemForm from "./ItemForm";

type PopupType = "delete" | "status" | null;
type FormType = "create" | "edit";

const ItemManagement = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>(null);
  const [formType, setFormType] = useState<FormType>("create");
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
    setEditPopupVisible(false);
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

  const onEdit = (item: ItemOptions) => {
    setPendingItem(item);
    setEditPopupVisible(true);
    setFormType("edit");
  };

  const onCreate = () => {
    setEditPopupVisible(true);
    setPendingItem(null);
    setFormType("create");
  };

  const onSubmit = (data: ItemFields) => {
    console.log("Submitted data:", data);
    if (formType === "edit" && pendingItem) {
      dispatch({
        type: "item/editItem",
        payload: { id: pendingItem.id, ...data },
      });
    } else if (formType === "create") {
      dispatch({
        type: "item/addItem",
        payload: data,
      });
    }
    setEditPopupVisible(false);
  };

  const deleteMessage = `Xóa sản phẩm ${pendingItem?.name}?`;
  const buttonLabel = formType === "create" ? "Thêm sản phẩm" : "Lưu thay đổi";
  const formTitle = formType === "create" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm";

  return (
    <div className="bg-white">
      {popupVisible && (
        <Popup
          message={popupType === "status" ? "" : deleteMessage}
          confirmText={popupType === "status" ? "" : "Xóa"}
          onConfirm={onConfirm}
          onCancel={closePopup}
        />
      )}
      {editPopupVisible && (
        <ItemForm
          onSubmit={onSubmit}
          initialValues={pendingItem as ItemFields}
          onClose={closePopup}
          label={buttonLabel}
          title={formTitle}
        />
      )}
      <NavBar username={currentUser?.name} onToggleDrawer={toggleDrawer} />
      <div className="flex">
        <Drawer isOpen={drawerOpen} />
        <div className="flex w-full flex-col p-5">
          <div className="flex justify-between pb-3">
            <h2 className="text-lg font-bold">Danh sách</h2>
            <div className="flex gap-5">
              <ManagementButton label="Thêm" onClick={onCreate} />
              <ManagementButton label="Logout" variant="red" onClick={logout} />
            </div>
          </div>
          <ItemTable
            data={TableData}
            onDelete={(record) => openPopup("delete", record)}
            onEdit={(record) => onEdit(record)}
          />
        </div>
      </div>
    </div>
  );
};
export default ItemManagement;
