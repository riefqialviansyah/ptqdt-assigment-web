import { useParams } from "react-router-dom";
import "./edit-page.scss";
import { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

export default function EditPage() {
  const params = useParams();
  const [editData, setEditData] = useState({});

  async function getEditData() {
    try {
      console.log(params.id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEditData();
  }, []);

  return (
    <div className="edit-sale-page">
      <h1>Edit Data Penjualan</h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nama barang"
          autoComplete="off"
        />
        <input type="number" name="stock" placeholder="Stock barang" />
        <input type="number" name="sellAmount" placeholder="Jumlah terjual" />
        <input type="date" name="transactionDate" />
        <input
          type="text"
          name="type"
          placeholder="Jenis Barang"
          autoComplete="off"
        />
        <button>Save Data</button>
      </form>
    </div>
  );
}
