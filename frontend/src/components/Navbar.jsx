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
} from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate("/login");
};
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

  const currentPage = pageTitles[location.pathname] || "Dashboard";

  const searchItems = [
    { name: "Dashboard", path: "/dashboard", icon: FolderKanban },
    { name: "Students", path: "/students", icon: Users },
    { name: "Mentors", path: "/mentors", icon: Users },
    { name: "Skills", path: "/skills", icon: Brain },
    { name: "Technologies", path: "/technologies", icon: Brain },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    {
      name: "Learning Resources",
      path: "/learning-resources",
      icon: FolderKanban,
    },
    { name: "Certificates", path: "/certificates", icon: Sparkles },
    { name: "Products", path: "/products", icon: FolderKanban },
    { name: "Case Studies", path: "/case-studies", icon: FolderKanban },
    { name: "Recommendations", path: "/recommendations", icon: Sparkles },

    { name: "HR Dashboard", path: "/hr/dashboard", icon: FolderKanban },
    { name: "HR Students", path: "/hr/students", icon: Users },
    { name: "HR Mentors", path: "/hr/mentors", icon: Users },
    { name: "HR Analytics", path: "/hr/analytics", icon: Brain },
    { name: "HR Reports", path: "/hr/reports", icon: Sparkles },
  ];

  const filteredSearch = searchItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}
      <div>
        <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="font-medium text-slate-700">
            {currentPage}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          {currentPage}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden lg:block">

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

            <Search size={18} className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-60 bg-transparent text-sm outline-none"
            />

          </div>

          {search && (
            <div className="absolute mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-xl">

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
                      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-100"
                    >
                      <Icon size={18} />
                      {item.name}
                    </button>
                  );
                })
              ) : (
                <p className="p-4 text-sm text-slate-500">
                  No result found
                </p>
              )}

            </div>
          )}

        </div>

        {/* Notification */}
        <div className="relative">

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border p-3 hover:bg-slate-100"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-xl border bg-white p-5 shadow-xl">

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold">Notifications</h3>

                <button onClick={() => setShowNotifications(false)}>
                  <X size={18} />
                </button>

              </div>

              <div className="space-y-3">

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="font-medium">
                    Knowledge Graph Updated
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="font-medium">
                    Recommendation Engine Ready
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* User */}
<div
  className="
    flex
    items-center
    gap-4
    rounded-2xl
    border
    border-slate-200
    bg-white
    px-4
    py-2
    shadow-sm
  "
>

  <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-blue-500/20">
    <img
      src={avatar}
      alt={user?.name || "User"}
      className="h-full w-full object-cover"
    />
  </div>

  <div className="hidden md:block">

    <p className="font-semibold text-slate-800">
      {user?.name || "Guest"}
    </p>

    <p className="text-xs text-slate-500">
      {user?.role || "Visitor"}
    </p>

  </div>
{user && (
  <button
    onClick={handleLogout}
    className="
      ml-2
      flex
      items-center
      gap-2
      rounded-xl
      bg-gradient-to-r
      from-blue-600
      via-indigo-600
      to-purple-600
      px-4
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
    "
  >
    <LogOut size={16} />
    Logout
  </button>
)}
</div>

      </div>

    </header>
  );
}


export default Navbar;