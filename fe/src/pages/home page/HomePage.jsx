import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useEffect, useState } from "react";

import "./homepage.scss";
import { useNavigate } from "react-router-dom";
const baseURl = import.meta.env.VITE_BASE_SERVER_URL;

export default function HomePage() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="homepage">
      <h1>Data Penjualan</h1>
      <table>
        <thead>
          <tr>
            <th className="order-no">No</th>
            <th className="item-name">Nama Barang</th>
            <th className="item-stock">Stock</th>
            <th className="item-sell-amount">Jumlah Terjual</th>
            <th className="item-transaction-date">Tanggal Transaksi</th>
            <th className="item-type">Jenis Barang</th>
            <th className="action">Opsi</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 &&
            sales.map((sale, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="data-name">{sale.name}</td>
                  <td>{sale.stock}</td>
                  <td>{sale.sellAmount}</td>
                  <td>{formatDate(sale.transactionDate)}</td>
                  <td>{sale.type}</td>
                  <td>
                    <div className="data-action">
                      <HiOutlinePencil
                        onClick={() => {
                          navigate(`/edit-sale/${sale.id}`);
                        }}
                      />
                      <HiOutlineTrash
                        onClick={() => {
                          deleteSales(sale.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
