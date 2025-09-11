import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function AdminDash() {
  return (
    <>
      <Header />
      <Sidebar />

      <main className="main-content">
        <div className="main-content__body">
          <Outlet /> {/* child routes render here */}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AdminDash;