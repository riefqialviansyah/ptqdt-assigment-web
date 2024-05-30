import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./layout-page.scss";
import Sidebar from "../../components/sidebar/Sideber";

export default function LayoutPage() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <main>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="about">About</div>
      </main>
    </div>
  );
}
