import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./layout-page.scss";
import Sidebar from "../../components/sidebar/Sideber";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchDataStatistic,
  setStatusData,
  fetchDataBarang,
} from "../../store/sellDataSlicer";
import "react-toastify/dist/ReactToastify.css";
import { errAlert } from "../../helpers/alert";
import { ToastContainer } from "react-toastify";

export default function LayoutPage() {
  const statisticItem = useSelector((state) => state.sellData.dataBarang);
  const statisticSellAmountData = useSelector(
    (state) => state.sellData.statistikSellAmount
  );
  const [filterDate, setFilterDate] = useState({
    from: "",
    to: "",
    filter: "max",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function hanledFilterDate(e) {
    setFilterDate({ ...filterDate, [e.target.name]: e.target.value });
  }

  function filterStatistic() {
    if (!filterDate.from || !filterDate.to || !filterDate.filter) {
      errAlert("Please fill range of date and type of data");
      return;
    }

    navigate(
      `/?filter[from]=${filterDate.from}&filter[to]=${filterDate.to}&filter[type]=${filterDate.filter}`
    );
    dispatch(
      fetchDataStatistic({
        from: filterDate.from,
        to: filterDate.to,
        type: filterDate.filter,
      })
    );
    dispatch(setStatusData("filter"));
    setFilterDate({ ...filterDate, from: "", to: "" });
  }

  useEffect(() => {
    dispatch(fetchDataBarang());
  }, []);

  return (
    <div className="layout">
      <ToastContainer />
      <div className="navbar">
        <Navbar />
      </div>
      <main>
        <div className="sidebar">
          <Sidebar />
          <div className="statistik">
            <h3>Statistik</h3>
            <div>
              <span>
                Penjualan data (<i>All Time</i>)
              </span>
              <div className="data-statistik">
                <table>
                  <tr>
                    <td className="key">Max</td>
                    <td>: {statisticSellAmountData.max}</td>
                  </tr>
                  <tr>
                    <td className="key">Min</td>
                    <td>: {statisticSellAmountData.min}</td>
                  </tr>
                  <tr>
                    <td className="key">Avg</td>
                    <td>: {Math.round(statisticSellAmountData.avg)}</td>
                  </tr>
                  <tr>
                    <td className="key">Total</td>
                    <td>: {statisticSellAmountData.total}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="filter-date">
            <h3>Filter penjualan</h3>
            <div>
              <span>Sejak</span>
              <input
                type="date"
                name="from"
                onChange={hanledFilterDate}
                value={filterDate.from}
              />
            </div>
            <div>
              <span>Hingga</span>
              <input
                type="date"
                name="to"
                onChange={hanledFilterDate}
                value={filterDate.to}
              />
            </div>
            <div>
              <label>Jenis Data</label>
              <select
                name="filter"
                onChange={hanledFilterDate}
                value={filterDate.filter}
              >
                <option value="max">Max</option>
                <option value="min">Min</option>
              </select>
            </div>
            <div>
              <button onClick={filterStatistic}>Filter</button>
            </div>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="about">
          <div className="data">
            <h3>Top 5 Penjualan Barang</h3>
            {statisticItem.length > 0 &&
              statisticItem.map((item, idx) => {
                return (
                  <div key={idx}>
                    <span>
                      {idx + 1}. {item.name}
                    </span>
                    <span>{item.total}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
