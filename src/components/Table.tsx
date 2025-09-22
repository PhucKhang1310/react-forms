interface TableItems {
  id: string;
  name: string;
  email: string;
  updatedAt: string;
  status?: boolean;
}

interface TableProps {
  items?: TableItems[];
  onToggle?: (item: TableItems) => void;
  onDelete?: (item: TableItems) => void;
}

const tableHeaders = [
  { label: "Tên" },
  { label: "Email" },
  { label: "Ngày cập nhật" },
  { label: "Trạng thái" },
  { label: "" },
];

const tableBorder = "border border-black";

const Table = ({ onDelete, onToggle, items }: TableProps) => {
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
                />
                {item.status ? "Kích hoạt" : "Chưa kích hoạt"}
              </td>
              <td className={`${tableBorder} pl-3.5`}>
                <div className="flex gap-3 justify-center items-center">
                  <button className="edit-icon aspect-square h-5 bg-no-repeat bg-center" />
                  <button
                    className="delete-icon aspect-square h-5 bg-no-repeat bg-center"
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
