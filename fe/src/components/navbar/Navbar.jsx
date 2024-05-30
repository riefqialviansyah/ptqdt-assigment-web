import "./navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">Kage Code</div>
      <div className="search">
        <input
          type="text"
          name="search"
          placeholder="Cari history penjualan, berdasarkan nama, stock, jumlah terjual dan jenis barang..."
        />
        <select name="" className="selection">
          <option value="name">Nama</option>
          <option value="name">Transaksi</option>
        </select>
        <select name="" className="selection">
          <option value="asc">ASC</option>
          <option value="dsc">DSC</option>
        </select>
        <button>Search</button>
      </div>
      <div className="option">Option</div>
    </nav>
  );
}
