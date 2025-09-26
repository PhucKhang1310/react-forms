import {
  Button,
  Input,
  Table,
  Tag,
  type InputRef,
  type TableColumnType,
} from "antd";
import { useAppSelector } from "../app/hooks";
import Column from "antd/es/table/Column";
import TableAction from "./TableAction";
import { ITEM_TAGS, type ItemOptions, type ItemTag } from "../app/itemSlice";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

interface ItemTableProps {
  data: ItemOptions[];
  onEdit?: (record: ItemOptions) => void;
  onDelete?: (record: ItemOptions) => void;
}

const ItemTable = ({ onEdit, onDelete }: ItemTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: keyof ItemOptions,
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

  const tagFilters = ITEM_TAGS.map((tag) => ({ text: tag, value: tag }));

  const getColumnSearchProps = (
    dataIndex: keyof ItemOptions,
  ): TableColumnType<ItemOptions> => ({
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
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchColumn === dataIndex ? (
        <Highlighter
          highlightClassName="bg-yellow-200"
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const data = useAppSelector((state) => state.item.items);
  const tagColorMap: Record<ItemTag, string> = {
    "Đồ uống": "blue",
    "Tạp hóa": "green",
    "Đông lạnh": "cyan",
    "Đồ ăn vặt": "purple",
    Kẹo: "magenta",
  };

  return (
    <div>
      <Table dataSource={data} pagination={false} scroll={{ y: 55 * 13 }}>
        <Column
          title="Tên sản phẩm"
          dataIndex="name"
          key="name"
          {...getColumnSearchProps("name")}
        />
        <Column
          title="Mã sản phẩm"
          dataIndex="sku"
          key="sku"
          {...getColumnSearchProps("sku")}
        />
        <Column
          title="Giá (VND)"
          dataIndex="price"
          key="price"
          sorter={(a, b) => a.price - b.price}
        />
        <Column
          title="Số lượng"
          dataIndex="stock"
          key="stock"
          sorter={(a, b) => a.stock - b.stock}
        />
        <Column
          title="Thể loại"
          dataIndex="tags"
          key="tags"
          render={(_, { tags }) => (
            <>
              {tags.map((tag: ItemTag) => (
                <Tag color={tagColorMap[tag]}>{tag}</Tag>
              ))}
            </>
          )}
          filters={tagFilters}
          onFilter={(value, record) => record.tags.includes(value as string)}
        />
        <Column
          title=""
          key="action"
          render={(_, record: ItemOptions) => (
            <div className="flex items-center justify-center gap-3">
              <TableAction
                className="edit-icon"
                onClick={() => onEdit?.(record)}
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
export default ItemTable;
