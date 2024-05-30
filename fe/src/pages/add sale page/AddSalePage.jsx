import { useState } from "react";
import "./addsalepage.scss";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

export default function AddSalePage() {
  const [inputUser, setInputUser] = useState({
    name: "",
    stock: "",
    sellAmount: "",
    transactionDate: "",
    type: "",
  });
  const navigate = useNavigate();

  function handleInput(e) {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch(`${baseUrl}/sales/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputUser),
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="addSalePage">
      <h1>Tambah Data Penjualan</h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nama barang"
          autoComplete="off"
          onChange={handleInput}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock barang"
          onChange={handleInput}
        />
        <input
          type="number"
          name="sellAmount"
          placeholder="Jumlah terjual"
          onChange={handleInput}
        />
        <input type="date" name="transactionDate" onChange={handleInput} />
        <input
          type="text"
          name="type"
          placeholder="Jenis Barang"
          autoComplete="off"
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>Save Data</button>
      </form>
    </div>
  );
}
