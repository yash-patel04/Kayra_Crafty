import './CSS/AdminNavbar.css';

const AdminNavbar = ({ onRestore, onLogout }) => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" className="logo-image" />
        <span>Admin Panel</span>
      </div>
      <div className="navbar-actions">
        <button className="restore-btn" onClick={onRestore}>
          Restore Data
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
