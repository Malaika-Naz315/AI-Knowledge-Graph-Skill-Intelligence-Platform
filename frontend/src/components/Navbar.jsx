import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { useAuth } from "../context/AuthContext";

import {
  Search,
  Bell,
  ChevronRight,
  Users,
  FolderKanban,
  Brain,
  Sparkles,
  X,
  LogOut,
  Menu,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // =====================================================
  // PAGE TITLES
  // =====================================================

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/students": "Students",
    "/mentors": "Mentors",
    "/skills": "Skills",
    "/technologies": "Technologies",
    "/projects": "Projects",
    "/learning-resources": "Learning Resources",
    "/certificates": "Certificates",
    "/products": "Products",
    "/case-studies": "Case Studies",
    "/recommendations": "Recommendations",

    "/hr/dashboard": "HR Dashboard",
    "/hr/students": "HR Students",
    "/hr/mentors": "HR Mentors",
    "/hr/analytics": "HR Analytics",
    "/hr/reports": "HR Reports",
  };

  const currentPage =
    pageTitles[location.pathname] || "Dashboard";

  // =====================================================
  // SEARCH ITEMS
  // =====================================================

  const searchItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FolderKanban,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
    {
      name: "Mentors",
      path: "/mentors",
      icon: Users,
    },
    {
      name: "Skills",
      path: "/skills",
      icon: Brain,
    },
    {
      name: "Technologies",
      path: "/technologies",
      icon: Brain,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Learning Resources",
      path: "/learning-resources",
      icon: FolderKanban,
    },
    {
      name: "Certificates",
      path: "/certificates",
      icon: Sparkles,
    },
    {
      name: "Products",
      path: "/products",
      icon: FolderKanban,
    },
    {
      name: "Case Studies",
      path: "/case-studies",
      icon: FolderKanban,
    },
    {
      name: "Recommendations",
      path: "/recommendations",
      icon: Sparkles,
    },

    // HR
    {
      name: "HR Dashboard",
      path: "/hr/dashboard",
      icon: FolderKanban,
    },
    {
      name: "HR Students",
      path: "/hr/students",
      icon: Users,
    },
    {
      name: "HR Mentors",
      path: "/hr/mentors",
      icon: Users,
    },
    {
      name: "HR Analytics",
      path: "/hr/analytics",
      icon: Brain,
    },
    {
      name: "HR Reports",
      path: "/hr/reports",
      icon: Sparkles,
    },
  ];

  const filteredSearch = searchItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =====================================================
  // NAVBAR
  // =====================================================

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        min-h-20
        items-center
        justify-between
        gap-3
        border-b
        border-slate-200
        bg-white
        px-3
        py-3
        sm:px-5
        lg:px-8
      "
    >

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Menu Button */}

        <button
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            shadow-sm
            hover:bg-slate-100
            lg:hidden
          "
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Page Information */}

        <div className="min-w-0">

          <div
            className="
              mb-1
              flex
              items-center
              gap-2
              text-xs
              text-slate-500
              sm:text-sm
            "
          >
            <span>Home</span>

            <ChevronRight size={14} />

            <span
              className="
                truncate
                font-medium
                text-slate-700
              "
            >
              {currentPage}
            </span>
          </div>

          <h1
            className="
              truncate
              text-lg
              font-bold
              text-slate-900
              sm:text-2xl
            "
          >
            {currentPage}
          </h1>

        </div>

      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2
          sm:gap-3
          lg:gap-5
        "
      >

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="relative">

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-2
              py-2
              sm:px-3
              lg:px-4
            "
          >

            <Search
              size={18}
              className="
                shrink-0
                text-slate-500
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="
                w-16
                bg-transparent
                text-xs
                outline-none
                sm:w-32
                sm:text-sm
                lg:w-60
              "
            />

          </div>

          {/* Search Results */}

          {search && (
            <div
              className="
                absolute
                right-0
                mt-2
                max-h-80
                w-64
                overflow-y-auto
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-xl
                sm:w-72
              "
            >

              {filteredSearch.length > 0 ? (

                filteredSearch.map((item) => {

                  const Icon = item.icon;

                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setSearch("");
                      }}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        hover:bg-slate-100
                      "
                    >

                      <Icon
                        size={18}
                        className="shrink-0"
                      />

                      <span className="text-sm">
                        {item.name}
                      </span>

                    </button>
                  );

                })

              ) : (

                <p
                  className="
                    p-4
                    text-sm
                    text-slate-500
                  "
                >
                  No result found
                </p>

              )}

            </div>
          )}

        </div>

        {/* =====================================================
            NOTIFICATIONS
        ===================================================== */}

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
              relative
              rounded-xl
              border
              border-slate-200
              p-2.5
              hover:bg-slate-100
              sm:p-3
            "
            aria-label="Notifications"
          >

            <Bell size={19} />

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />

          </button>

          {showNotifications && (

            <div
              className="
                absolute
                right-0
                mt-3
                w-72
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-xl
                sm:w-80
                sm:p-5
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >

                <h3 className="font-semibold">
                  Notifications
                </h3>

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="
                    rounded-lg
                    p-1
                    hover:bg-slate-100
                  "
                >
                  <X size={18} />
                </button>

              </div>

              <div className="space-y-3">

                <div
                  className="
                    rounded-lg
                    bg-slate-50
                    p-3
                  "
                >
                  <p className="font-medium">
                    Knowledge Graph Updated
                  </p>
                </div>

                <div
                  className="
                    rounded-lg
                    bg-slate-50
                    p-3
                  "
                >
                  <p className="font-medium">
                    Recommendation Engine Ready
                  </p>
                </div>

              </div>

            </div>

          )}

        </div>

        {/* =====================================================
            USER PROFILE
        ===================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-2
            py-2
            shadow-sm
            sm:gap-3
            sm:px-4
          "
        >

          {/* Avatar */}

          <div
            className="
              h-9
              w-9
              shrink-0
              overflow-hidden
              rounded-full
              ring-2
              ring-blue-500/20
              sm:h-11
              sm:w-11
            "
          >

            <img
              src={avatar}
              alt={user?.name || "User"}
              className="
                h-full
                w-full
                object-cover
              "
            />

          </div>

          {/* User Information */}

          <div className="hidden md:block">

            <p
              className="
                max-w-32
                truncate
                font-semibold
                text-slate-800
              "
            >
              {user?.name || "Guest"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role || "Visitor"}
            </p>

          </div>

          {/* Logout */}

          {user && (

            <button
              onClick={handleLogout}
              className="
                ml-1
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                px-3
                py-2
                text-sm
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-lg
                hover:from-blue-700
                hover:via-indigo-700
                hover:to-purple-700
                active:scale-95
                sm:ml-2
                sm:px-4
              "
            >

              <LogOut size={16} />

              <span className="hidden sm:inline">
                Logout
              </span>

            </button>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;