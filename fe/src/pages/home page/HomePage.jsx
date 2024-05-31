import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellData } from "../../store/sellDataSlicer";

import "./homepage.scss";
import { useNavigate } from "react-router-dom";
const baseURl = import.meta.env.VITE_BASE_SERVER_URL;

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellData = useSelector((state) => state.sellData.data);

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
      dispatch(fetchSellData());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchSellData());
  }, []);

  return (
    <div className="homepage">
      <h1>Data Penjualan</h1>
      <table>
        <thead>
          <tr>
            <th className="order-no">No</th>
            <th className="order-no">Id</th>
            <th className="item-name">Nama Barang</th>
            <th className="item-stock">Stock</th>
            <th className="item-sell-amount">Jumlah Terjual</th>
            <th className="item-transaction-date">Tanggal Transaksi</th>
            <th className="item-type">Jenis Barang</th>
            <th className="action">Opsi</th>
          </tr>
        </thead>
        <tbody>
          {sellData.length > 0 &&
            sellData.map((sale, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="data-id">{sale.id}</td>
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
