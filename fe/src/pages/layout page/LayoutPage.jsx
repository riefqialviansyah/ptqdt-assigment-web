import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./layout-page.scss";
import Sidebar from "../../components/sidebar/Sideber";
import { useSelector, useDispatch } from "react-redux";

export default function LayoutPage() {
  const statistik = useSelector((state) => state.sellData.statistik);
  const dispatch = useDispatch();

  function formatDate(date) {
    let tmpDate = new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return tmpDate;
  }

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <main>
        <div className="sidebar">
          <Sidebar />
          <div className="statistik">
            <h3>Statistik</h3>
            <div>
              <span>Penjualan tertinggi</span>
              <div className="data-statistik">
                <table>
                  <tr>
                    <td className="key">Barang</td>
                    <td>: {statistik[0] && statistik[0].name}</td>
                  </tr>
                  <tr>
                    <td className="key">Stock</td>
                    <td>: {statistik[0] && statistik[0].stock}</td>
                  </tr>
                  <tr>
                    <td className="key">Terjual</td>
                    <td>: {statistik[0] && statistik[0].sellAmount}</td>
                  </tr>
                  <tr>
                    <td className="key">Tanggal</td>
                    <td>
                      :{" "}
                      {statistik[0] && formatDate(statistik[0].transactionDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="key">Jenis</td>
                    <td>: {statistik[0] && statistik[0].type}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div>
              <span>Penjualan terendah</span>
              <div className="data-statistik">
                <table>
                  <tr>
                    <td className="key">Barang</td>
                    <td>: {statistik[1] && statistik[1].name}</td>
                  </tr>
                  <tr>
                    <td className="key">Stock</td>
                    <td>: {statistik[1] && statistik[1].stock}</td>
                  </tr>
                  <tr>
                    <td className="key">Terjual</td>
                    <td>: {statistik[1] && statistik[1].sellAmount}</td>
                  </tr>
                  <tr>
                    <td className="key">Tanggal</td>
                    <td>
                      :{" "}
                      {statistik[1] && formatDate(statistik[1].transactionDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="key">Jenis</td>
                    <td>: {statistik[1] && statistik[1].type}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="about">About</div>
      </main>
    </div>
  );
}
