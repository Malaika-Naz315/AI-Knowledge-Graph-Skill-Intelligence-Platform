import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-slate-100
      "
    >

      {/* ========================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ========================================= */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>


      {/* ========================================= */}
      {/* MOBILE SIDEBAR OVERLAY */}
      {/* ========================================= */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            lg:hidden
          "
          onClick={closeSidebar}
        />
      )}


      {/* ========================================= */}
      {/* MOBILE SIDEBAR */}
      {/* ========================================= */}

      <div
        className={`
          fixed
          left-0
          top-0
          z-[60]
          h-screen
          w-72
          transform
          transition-transform
          duration-300
          ease-in-out
          lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </div>


      {/* ========================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================= */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >

        {/* ========================================= */}
        {/* NAVBAR */}
        {/* ========================================= */}

        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />


        {/* ========================================= */}
        {/* PAGE CONTENT */}
        {/* ========================================= */}

        <main
          className="
            flex-1
            overflow-y-auto
            bg-slate-100
            p-4
            sm:p-6
            md:p-8
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AppLayout;