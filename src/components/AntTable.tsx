import {
  Button,
  Input,
  Space,
  Table,
  type InputRef,
  type TableColumnType,
} from "antd";
import type { AccountOptions } from "../app/accountSlice";
import Column from "antd/es/table/Column";
import "../styles/antTable.css";
import { useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";

interface AntTableProps {
  data: AccountOptions[];
  onToggle?: (record: AccountOptions) => void;
  onEdit?: (record: AccountOptions) => void;
  onDelete?: (record: AccountOptions) => void;
}

const AntTable = ({ data, onToggle, onDelete, onEdit }: AntTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: keyof AccountOptions,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof AccountOptions,
  ): TableColumnType<AccountOptions> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          className="mb-2 block"
        />
      </div>
    ),
  });

  return (
    <div>
      <Table<AccountOptions>
        dataSource={data}
        rowKey="id"
        pagination={false}
        bordered
      >
        <Column title="Tên tài khoản" dataIndex="name" key="name" {...getColumnSearchProps("name")} />
        <Column title="Email" dataIndex="email" key="email" {...getColumnSearchProps("email")} />
        <Column title="Ngày cập nhật" dataIndex="updatedAt" key="updatedAt" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="status"
          render={(_, record: AccountOptions) => (
            <div className="flex gap-4">
              <input
                type="checkbox"
                checked={record.status}
                onClick={() => onToggle?.(record)}
                className="check-icon mt-0.75 rounded border border-gray-400 bg-gray-300 bg-none bg-cover bg-no-repeat ring-0 checked:bg-white"
              />
              {record.status ? "Đã kích hoạt" : "Chưa kích hoạt"}
            </div>
          )}
        />
        <Column
          title=""
          key="action"
          render={(_, record: AccountOptions) => (
            <div className="flex items-center justify-center gap-3">
              <button
                className="edit-icon aspect-square h-5 bg-center bg-no-repeat hover:cursor-pointer"
                onClick={() => onEdit?.(record)}
              />
              <button
                className="delete-icon aspect-square h-5 bg-center bg-no-repeat hover:cursor-pointer"
                onClick={() => onDelete?.(record)}
              />
            </div>
          )}
        />
      </Table>
    </div>
  );
};
export default AntTable;
