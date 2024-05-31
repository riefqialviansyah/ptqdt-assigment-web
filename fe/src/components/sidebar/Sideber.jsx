import { HiOutlineTable, HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSellData } from "../../store/sellDataSlicer";
import "./sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="sidebar-component">
      <div
        onClick={() => {
          navigate("/");
          dispatch(fetchSellData());
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
