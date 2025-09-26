import {
  Button,
  Input,
  Table,
  type InputRef,
  type TableColumnType,
} from "antd";
import type { AccountOptions } from "../app/accountSlice";
import Column from "antd/es/table/Column";
import "../styles/antTable.css";
import { useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import TableAction from "./TableAction";

interface ManagementTableProps {
  data: AccountOptions[];
  onToggle?: (record: AccountOptions) => void;
  onEdit?: (record: AccountOptions) => void;
  onDelete?: (record: AccountOptions) => void;
  onView?: (record: AccountOptions) => void;
}

const ManagementTable = ({
  data,
  onToggle,
  onDelete,
  onEdit,
  onView,
}: ManagementTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: keyof AccountOptions,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"],
  ) => {
    clearFilters();
    setSearchText("");
    setSearchColumn("");
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: keyof AccountOptions,
  ): TableColumnType<AccountOptions> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="flex flex-col p-2" onKeyDown={(e) => e.stopPropagation()}>
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
        <div className="flex w-full justify-end gap-2 pt-2">
          <Button
            type="text"
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            className="w-15"
          >
            Reset
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            className="w-15"
          >
            Search
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        className={`text-gray-400 ${filtered ? "hidden" : ""} text-lg`}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.focus(), 100);
        }
      },
    },
    render: (text) =>
      searchColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
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
        <Column
          title="Tên tài khoản"
          dataIndex="name"
          key="name"
          {...getColumnSearchProps("name")}
        />
        <Column
          title="Email"
          dataIndex="email"
          key="email"
          {...getColumnSearchProps("email")}
        />
        <Column
          title="Ngày cập nhật"
          dataIndex="updatedAt"
          key="updatedAt"
          sorter={(a, b) =>
            parseDate(a.updatedAt).getTime() - parseDate(b.updatedAt).getTime()
          }
          sortDirections={["ascend", "descend"]}
        />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="status"
          filters={[
            { text: "Đã kích hoạt", value: true },
            { text: "Chưa kích hoạt", value: false },
          ]}
          onFilter={(value, record: AccountOptions) => record.status === value}
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
              <TableAction
                className="edit-icon"
                onClick={() => onEdit?.(record)}
              />
              <TableAction
                className="article-icon"
                onClick={() => onView?.(record)}
              />
              <TableAction
                className="delete-icon"
                onClick={() => onDelete?.(record)}
              />
            </div>
          )}
        />
      </Table>
    </div>
  );
};
export default ManagementTable;
