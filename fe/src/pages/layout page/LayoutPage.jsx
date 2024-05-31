import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./layout-page.scss";
import Sidebar from "../../components/sidebar/Sideber";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchDataStatistic, setStatusData } from "../../store/sellDataSlicer";
import "react-toastify/dist/ReactToastify.css";
import { errAlert } from "../../helpers/alert";
import { ToastContainer } from "react-toastify";

export default function LayoutPage() {
  const statistik = useSelector((state) => state.sellData.statistik);
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

  function formatDate(date) {
    let tmpDate = new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return tmpDate;
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
                    <td>: {statistik[0] && statistik[0].name}</td>
                  </tr>
                  <tr>
                    <td className="key">Min</td>
                    <td>: {statistik[0] && statistik[0].stock}</td>
                  </tr>
                  <tr>
                    <td className="key">Avg</td>
                    <td>: {statistik[0] && statistik[0].sellAmount}</td>
                  </tr>
                  <tr>
                    <td className="key">Total</td>
                    <td>
                      :{" "}
                      {statistik[0] && formatDate(statistik[0].transactionDate)}
                    </td>
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
        <div className="about">About</div>
      </main>
    </div>
  );
}
