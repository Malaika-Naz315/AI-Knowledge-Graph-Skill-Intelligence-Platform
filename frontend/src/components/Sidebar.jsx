import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserCog,
  Brain,
  Boxes,
  FolderKanban,
  BookOpen,
  Award,
  Package,
  FileText,
  Sparkles,
  Waypoints,
  Database,
  CircleDot,
  UserRoundCheck,
  BarChart3,
  ClipboardList,
  X,
} from "lucide-react";

function Sidebar({ onClose }) {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
    {
      name: "Mentors",
      path: "/mentors",
      icon: UserCog,
    },
    {
      name: "Skills",
      path: "/skills",
      icon: Brain,
    },
    {
      name: "Technologies",
      path: "/technologies",
      icon: Boxes,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Learning Resources",
      path: "/learning-resources",
      icon: BookOpen,
    },
    {
      name: "Certificates",
      path: "/certificates",
      icon: Award,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Case Studies",
      path: "/case-studies",
      icon: FileText,
    },
    {
      name: "Recommendations",
      path: "/recommendations",
      icon: Sparkles,
    },

    // =========================
    // HR MODULE
    // =========================

    {
      name: "HR Dashboard",
      path: "/hr/dashboard",
      icon: UserRoundCheck,
    },
    {
      name: "HR Students",
      path: "/hr/students",
      icon: Users,
    },
    {
      name: "HR Mentors",
      path: "/hr/mentors",
      icon: UserCog,
    },
    {
      name: "HR Analytics",
      path: "/hr/analytics",
      icon: BarChart3,
    },
    {
      name: "HR Reports",
      path: "/hr/reports",
      icon: ClipboardList,
    },
  ];

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        shrink-0
        flex-col
        bg-[#0B1120]
        text-white
        border-r
        border-slate-800
      "
    >
      {/* =========================================
          BRAND HEADER
      ========================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800
          px-6
          py-6
        "
      >
        <div className="flex items-center gap-3">
          {/* Logo */}

          <div
            className="
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              via-indigo-600
              to-purple-600
              shadow-lg
            "
          >
            <Waypoints size={25} />

            <div
              className="
                absolute
                -right-1
                -top-1
                h-3
                w-3
                rounded-full
                border-2
                border-[#0B1120]
                bg-green-400
              "
            />
          </div>

          {/* Brand Text */}

          <div>
            <h1 className="text-sm font-bold tracking-wide">
              AI Knowledge Graph
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Skill Intelligence Platform
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}

        <button
          onClick={onClose}
          className="
            rounded-xl
            p-2
            text-slate-400
            hover:bg-slate-800
            hover:text-white
            lg:hidden
          "
          aria-label="Close sidebar"
        >
          <X size={21} />
        </button>
      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-6
        "
      >
        {/* Section Title */}

        <div
          className="
            mb-4
            flex
            items-center
            gap-2
            px-3
          "
        >
          <Database
            size={14}
            className="text-blue-400"
          />

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-slate-500
            "
          >
            Platform Modules
          </p>
        </div>

        {/* Menu */}

        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    relative
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                    `
                  }
                >
                  {/* Icon */}

                  <Icon
                    size={19}
                    className="
                      shrink-0
                      transition
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  {/* Name */}

                  <span className="truncate">
                    {item.name}
                  </span>

                  {/* AI Badge */}

                  {item.name === "Recommendations" && (
                    <span
                      className="
                        ml-auto
                        rounded-full
                        bg-purple-500/20
                        px-2
                        py-0.5
                        text-[10px]
                        text-purple-300
                      "
                    >
                      AI
                    </span>
                  )}

                  {/* HR Badge */}

                  {item.name.startsWith("HR") && (
                    <span
                      className="
                        ml-auto
                        rounded-full
                        bg-green-500/20
                        px-2
                        py-0.5
                        text-[10px]
                        text-green-300
                      "
                    >
                      HR
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* =========================================
          SYSTEM STATUS
      ========================================= */}

      <div
        className="
          border-t
          border-slate-800
          p-5
        "
      >
        {/* Database Status */}

        <div
          className="
            mb-4
            rounded-2xl
            bg-slate-800/70
            p-4
          "
        >
          <div className="flex items-center gap-2">
            <CircleDot
              size={14}
              className="text-green-400"
            />

            <p className="text-sm font-semibold">
              System Status
            </p>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Neo4j Graph Database Connected
          </p>
        </div>

        {/* Developer Info */}

        <div
          className="
            rounded-xl
            bg-slate-800
            p-3
          "
        >
          <p className="text-sm font-semibold">
            Malaika Naz
          </p>

          <p className="text-xs text-slate-400">
            Backend • FastAPI • Neo4j
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;