interface TableActionProps {
    className?: string;
    onClick?: () => void;
}

const TableAction = ({ className, onClick }: TableActionProps) => {
  return (
    <button className={`aspect-square h-5 bg-center bg-no-repeat hover:cursor-pointer ${className}`} onClick={onClick}/>
  );
};
export default TableAction;
