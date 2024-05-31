import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSellData } from "../../store/sellDataSlicer";
import "./navbar.scss";

export default function Navbar() {
  const [searchKey, setSearchKey] = useState({
    searchKey: "",
    orderBy: "transaksi",
    sort: "desc",
  });
  const dispatch = useDispatch();

  function searchHandler(e) {
    const { name, value } = e.target;
    setSearchKey({ ...searchKey, [name]: value });
  }

  async function refetchData() {
    dispatch(fetchSellData(searchKey));
  }

  return (
    <nav>
      <div className="logo">Kage Code</div>
      <div className="search">
        <input
          type="text"
          name="searchKey"
          placeholder="Cari history penjualan, berdasarkan nama, stock, jumlah terjual dan jenis barang..."
          onChange={searchHandler}
        />
        <select name="orderBy" className="selection" onChange={searchHandler}>
          <option disabled selected>
            Urut Berdasar
          </option>
          <option value="name">Nama</option>
          <option value="name">Transaksi</option>
        </select>
        <select name="sort" className="selection" onChange={searchHandler}>
          <option selected disabled>
            Pilih Urutan
          </option>
          <option value="asc">ASC</option>
          <option value="dsc">DSC</option>
        </select>
        <button onClick={refetchData}>Search</button>
      </div>
      <div className="option">Option</div>
    </nav>
  );
}
