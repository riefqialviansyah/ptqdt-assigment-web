import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSellData } from "../../store/sellDataSlicer";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { HiCubeTransparent } from "react-icons/hi";

export default function Navbar() {
  const [searchKey, setSearchKey] = useState({
    key: "",
    order: "transactionDate",
    sort: "DESC",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function searchHandler(e) {
    const { name, value } = e.target;
    setSearchKey({ ...searchKey, [name]: value });
  }

  async function refetchData() {
    dispatch(fetchSellData(searchKey));
    navigate(
      `/?search=${searchKey.key}&order=${searchKey.order}&sort=${searchKey.sort}`
    );
  }

  return (
    <nav>
      <div className="logo">
        <HiCubeTransparent /> Selles App
      </div>
      <div className="search">
        <input
          type="text"
          name="key"
          placeholder="Cari history penjualan, berdasarkan nama, dan jenis barang..."
          onChange={searchHandler}
          autoComplete="off"
        />
        <select name="order" className="selection" onChange={searchHandler}>
          <option disabled selected>
            Urut Berdasar
          </option>
          <option value="name">Nama</option>
          <option value="transactionDate">Transaksi</option>
          <option value="sellAmount">Terjual</option>
        </select>
        <select name="sort" className="selection" onChange={searchHandler}>
          <option selected disabled>
            Pilih Urutan
          </option>
          <option value="ASC">ASC</option>
          <option value="DESC">DSC</option>
        </select>
        <button onClick={refetchData}>Search</button>
      </div>
      <div className="option">
        <a
          href="https://github.com/riefqialviansyah/ptqdt-assigment-web"
          target="blank"
        >
          Github
        </a>
      </div>
    </nav>
  );
}
