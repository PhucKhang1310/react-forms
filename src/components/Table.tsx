import type { AccountOptions } from "../app/accountSlice";

interface TableProps {
  items?: AccountOptions[];
  onToggle?: (item: AccountOptions) => void;
  onDelete?: (item: AccountOptions) => void;
  onEdit?: (item: AccountOptions) => void;
}

const tableHeaders = [
  { label: "Tên" },
  { label: "Email" },
  { label: "Ngày cập nhật" },
  { label: "Trạng thái" },
  { label: "" },
];

const tableBorder = "border border-black";

const Table = ({ onDelete, onToggle, onEdit, items }: TableProps) => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#DCD7C9] text-left">
            {tableHeaders.map((header, index) => (
              <th key={index} className={`${tableBorder} h-[30px] pl-3.5`}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.id} className="h-[30px]">
              <td className={`${tableBorder} pl-3.5`}>{item.name}</td>
              <td className={`${tableBorder} pl-3.5`}>{item.email}</td>
              <td className={`${tableBorder} pl-3.5`}>{item.updatedAt}</td>
              <td className={`${tableBorder} pl-3.5`}>
                <input
                  type="checkbox"
                  checked={item.status}
                  onClick={() => onToggle?.(item)}
                  className="check-icon mr-1 mb-1 border rounded border-gray-400 bg-gray-300 bg-none bg-cover bg-no-repeat ring-0 checked:bg-white"
                />
                {item.status ? "Kích hoạt" : "Chưa kích hoạt"}
              </td>
              <td className={`${tableBorder} pl-3.5`}>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="edit-icon aspect-square h-5 bg-center bg-no-repeat hover:cursor-pointer"
                    onClick={() => onEdit?.(item)}
                  />
                  <button
                    className="delete-icon aspect-square h-5 bg-center bg-no-repeat hover:cursor-pointer"
                    onClick={() => onDelete?.(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
