import { HiOutlineTrash } from "react-icons/hi";
import "./homepage.scss";
import { useEffect, useState } from "react";
const baseURl = import.meta.env.VITE_BASE_SERVER_URL;

export default function HomePage() {
  const [sales, setSales] = useState([]);

  async function getSales() {
    try {
      const response = await fetch(`${baseURl}/sales/getAll`);

      const data = await response.json();

      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSales();
  });

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
        <div className="sidebar">Side Bar</div>
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
                <th className="tindakan">Opsi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className="itemName">Kopi</td>
                <td>100</td>
                <td>25</td>
                <td className="transaction">Senin, 1 Mei 2021</td>
                <td>Konsumsi</td>
                <td className="tindakan">
                  <HiOutlineTrash />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="about">About</div>
      </main>
    </div>
  );
}
