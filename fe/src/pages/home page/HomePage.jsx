import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTable,
  HiOutlineX,
  HiOutlineCheck,
} from "react-icons/hi";
import "./homepage.scss";
import { useEffect, useState } from "react";
const baseURl = import.meta.env.VITE_BASE_SERVER_URL;

export default function HomePage() {
  const [sales, setSales] = useState([]);
  const [isAddData, setIsAddData] = useState(false);
  const [inputUser, setInputUser] = useState({
    name: "",
    stock: 0,
    sellAmount: 0,
    transactionDate: "",
    type: "",
  });
  const [isEdit, setIsEdit] = useState({ id: null, status: false });
  const [editInput, setEditInput] = useState(null);

  async function getSales() {
    try {
      const response = await fetch(`${baseURl}/sales/getAll`);

      const data = await response.json();

      setSales(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(date) {
    let tmpDate = new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return tmpDate;
  }

  async function deleteSales(id) {
    try {
      await fetch(`${baseURl}/sales/delete/${id}`, { method: "DELETE" });
      await getSales();
    } catch (error) {
      console.log(error);
    }
  }

  function inputHandler(e) {
    const { name, value } = e.target;
    setInputUser({ ...inputUser, [name]: value });
  }

  async function addNewSale(e) {
    e.preventDefault();
    try {
      await fetch(`${baseURl}/sales/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputUser),
      });

      await getSales();
      setIsAddData(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(e) {
    const { name, value } = e.target;
    setEditInput({ ...editInput, [name]: value });
  }

  function formateDateToInput(date) {
    let tmpDate = new Date(date).toISOString().split("T")[0];
    return tmpDate;
  }

  async function saveEditSale() {
    try {
      await fetch(`${baseURl}/sales/update/${isEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editInput),
      });

      await getSales();
      setIsEdit({ id: null, status: false });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="homepage">
      <nav>
        <div className="logo">Kage Code</div>
        <div className="search">
          <input type="text" />
        </div>
        <div className="option">Option</div>
      </nav>
      <main>
        <div className="sidebar">
          <div
            onClick={() => {
              setIsAddData(false);
            }}
          >
            <HiOutlineTable />
            <span>Sales Data</span>
          </div>
          <div
            onClick={() => {
              setIsAddData(true);
            }}
          >
            <HiOutlinePlus />
            <span>Tambah Data</span>
          </div>
        </div>
        {isAddData ? (
          <div className="addData">
            <h1>Tambah Data</h1>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Nama barang"
                onChange={inputHandler}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={inputHandler}
              />
              <input
                type="number"
                name="sellAmount"
                placeholder="Jumlah Terjual"
                onChange={inputHandler}
              />
              <div>
                <input
                  type="date"
                  name="transactionDate"
                  className="dateInput"
                  onChange={inputHandler}
                />
                <span>Tanggal Transaksi</span>
              </div>
              <input
                type="text"
                name="type"
                placeholder="Jenis Barang"
                onChange={inputHandler}
              />
              <button onClick={addNewSale}>Add Data</button>
            </form>
          </div>
        ) : (
          <div className="data">
            <h1>Data Penjualan</h1>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Barang</th>
                  <th>Stock</th>
                  <th>Jumlah Terjual</th>
                  <th>Tanggal Transaksi</th>
                  <th>Janis Barang</th>
                  <th className="action">Opsi</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 &&
                  sales.map((sale, index) => {
                    return isEdit.status == true && isEdit.id == sale.id ? (
                      <tr>
                        <td>{index + 1}</td>
                        <td className="placeNameInput">
                          <input
                            type="text"
                            name="name"
                            className="nameInput"
                            value={editInput.name}
                            onChange={handleEdit}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="stock"
                            className="stockInput"
                            value={editInput.stock}
                            onChange={handleEdit}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="sellAmount"
                            className="sellAmountInput"
                            value={editInput.sellAmount}
                            onChange={handleEdit}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="transactionDate"
                            value={formateDateToInput(
                              editInput.transactionDate
                            )}
                            onChange={handleEdit}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="type"
                            className="typeInput"
                            value={editInput.type}
                            onChange={handleEdit}
                          />
                        </td>
                        <td className="action">
                          <HiOutlineCheck onClickCapture={saveEditSale} />
                          <HiOutlineX
                            onClick={() => {
                              setIsEdit({ id: null, status: false });
                            }}
                          />
                        </td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="itemName">{sale.name}</td>
                        <td>{sale.stock}</td>
                        <td>{sale.sellAmount}</td>
                        <td className="transaction">
                          {formatDate(sale.transactionDate)}
                        </td>
                        <td>{sale.type}</td>
                        <td className="action">
                          <HiOutlinePencil
                            onClick={() => {
                              setIsEdit({ id: sale.id, status: true });
                              setEditInput(sale);
                            }}
                          />
                          <HiOutlineTrash
                            style={{ opacity: "50%" }}
                            onClick={() => {
                              deleteSales(sale.id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        <div className="about">About</div>
      </main>
    </div>
  );
}
