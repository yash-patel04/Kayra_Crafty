import React, { useState } from "react";
import AdminPanelSidebar from "./AdminPanelSidebar";
import AdminPanel from "./AdminPanel";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  const [selectedArt, setSelectedArt] = useState(null);

  return (
    <div >
      <AdminNavbar/>
      <AdminPanelSidebar onSelectArt={(art) => setSelectedArt(art)} />
      <AdminPanel selectedArt={selectedArt} />
    </div>
  );
};

export default AdminDashboard;
