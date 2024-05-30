import { HiOutlineTable, HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-component">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <HiOutlineTable />
        <span>Sales Data</span>
      </div>
      <div
        onClick={() => {
          navigate("/add-sale");
        }}
      >
        <HiOutlinePlus />
        <span>Tambah Data</span>
      </div>
    </div>
  );
}
