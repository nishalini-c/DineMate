import React from 'react';
import { Link } from 'react-router-dom';
import '../Admin/admin.css';
import Dashboard from './Dashboard';

function Admin() {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="logo">
          <h2>DashBoard</h2>
        </div>
        <br/>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to ="landing">
               <i className="fa-solid fa-house"></i> Home
               </Link>
            </li>
            <br/>
            <li>
              <Link to="/admin/tableView">
                <i class="fa-solid fa-table-cells"></i> Table View
              </Link>
            </li>
            <br/>
            <li>
              <Link to="/admin/table">
                <i className="fa-solid fa-table"></i> Users Booking 
              </Link>
            </li>
            <br/>
            <li>
              <Link to="/admin/user">
                <i className="fa-solid fa-user"></i> Users Detils
              </Link>
            </li>
            <br/>
            <li>
              <Link to="/admin/view">
              <i class="fa-solid fa-table-cells"></i> Table View List
              </Link>
            </li>
            <li>
            <br/>
              <Link to="/admin/settings">
                <i className="fa-solid fa-gear"></i> Settings
              </Link>
            </li>
            <br/>
          </ul>
        </div>
        <div className="sidebar-logout"> 
          <button>
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </button>
        </div>
      </div>
      <div className="main-content">
        <h1>Welcome to Admin Dashboard</h1>
        <Dashboard/>
        {/* Other components and sections will be rendered here based on routing */}
      </div>
    </div>
  );
}

export default Admin;