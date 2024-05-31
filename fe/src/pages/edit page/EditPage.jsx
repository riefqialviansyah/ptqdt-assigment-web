import { useNavigate, useParams } from "react-router-dom";
import "./edit-page.scss";
import { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

export default function EditPage() {
  const params = useParams();
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  async function getEditData() {
    try {
      const response = await fetch(`${baseUrl}/sales/getOne/${params.id}`);

      const data = await response.json();
      setEditData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function fotmatDateToInput(date) {
    if (!date) return "";
    let tmpDate = date.split("T")[0];
    return tmpDate;
  }

  function handleEditData(e) {
    const { name, value } = e.target;

    setEditData({ ...editData, [name]: value });
  }

  async function updateData(e) {
    e.preventDefault();

    try {
      await fetch(`${baseUrl}/sales/update/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(editData),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/");
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
          value={editData.name}
          onChange={handleEditData}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock barang"
          value={editData.stock}
          onChange={handleEditData}
        />
        <input
          type="number"
          name="sellAmount"
          placeholder="Jumlah terjual"
          value={editData.sellAmount}
          onChange={handleEditData}
        />
        <input
          type="date"
          name="transactionDate"
          value={fotmatDateToInput(editData.transactionDate)}
          onChange={handleEditData}
        />
        <input
          type="text"
          name="type"
          placeholder="Jenis Barang"
          autoComplete="off"
          value={editData.type}
          onChange={handleEditData}
        />
        <button onClickCapture={updateData}>Save Data</button>
      </form>
    </div>
  );
}
