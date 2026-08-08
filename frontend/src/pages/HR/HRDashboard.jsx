import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Users,
  UserRoundCheck,
  Code2,
  FolderKanban,
  Award,
  BookOpen,
  Package,
  FileText,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import {
  getHRDashboard,
} from "../../services/hrApi";


const HRDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHRDashboard();

      setDashboard(data.dashboard || {});
    } catch (err) {
      console.error("HR Dashboard Error:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to load HR dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = dashboard || {};

  const cards = [
    {
      title: "Students",
      value:
        stats.students ??
        stats.total_students ??
        0,
      icon: Users,
      path: "/hr/students",
      description: "Manage students",
    },

    {
      title: "Mentors",
      value:
        stats.mentors ??
        stats.total_mentors ??
        0,
      icon: UserRoundCheck,
      path: "/hr/mentors",
      description: "View mentors",
    },

    {
      title: "Skills",
      value:
        stats.skills ??
        stats.total_skills ??
        0,
      icon: Code2,
      path: "/skills",
      description: "Explore skills",
    },

    {
      title: "Technologies",
      value:
        stats.technologies ??
        stats.total_technologies ??
        0,
      icon: Code2,
      path: "/technologies",
      description: "View technologies",
    },

    {
      title: "Projects",
      value:
        stats.projects ??
        stats.total_projects ??
        0,
      icon: FolderKanban,
      path: "/projects",
      description: "View projects",
    },

    {
      title: "Certificates",
      value:
        stats.certificates ??
        stats.total_certificates ??
        0,
      icon: Award,
      path: "/certificates",
      description: "View certificates",
    },

    {
      title: "Learning Resources",
      value:
        stats.learning_resources ??
        stats.total_learning_resources ??
        0,
      icon: BookOpen,
      path: "/learning-resources",
      description: "Explore resources",
    },

    {
      title: "Products",
      value:
        stats.products ??
        stats.total_products ??
        0,
      icon: Package,
      path: "/products",
      description: "View products",
    },

    {
      title: "Case Studies",
      value:
        stats.case_studies ??
        stats.total_case_studies ??
        0,
      icon: FileText,
      path: "/case-studies",
      description: "Explore case studies",
    },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-8 h-10 w-72 animate-pulse rounded-lg bg-slate-200" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl bg-slate-200"
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            HR Control Center
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            HR Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor students, mentors, skills and
            platform intelligence.
          </p>
        </div>

        <button
          onClick={loadDashboard}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <span>{error}</span>

          <button
            onClick={loadDashboard}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI CARDS */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex items-start justify-between">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon size={22} />
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />

              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {card.value}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {card.description}
              </p>

            </button>
          );
        })}

      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          HR Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Access HR intelligence directly.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">

          <button
            onClick={() => navigate("/hr/students")}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Manage Students
          </button>

          <button
            onClick={() => navigate("/hr/mentors")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Mentors
          </button>

          <button
            onClick={() => navigate("/hr/analytics")}
            className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Open Analytics
          </button>

          <button
            onClick={() => navigate("/hr/reports")}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Generate Reports
          </button>

        </div>

      </div>

    </div>
  );
};

export default HRDashboard;