import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Eye,
  RefreshCw,
  Users,
} from "lucide-react";

import {
  getHRStudents,
} from "../../services/hrApi";


const HRStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHRStudents();

      setStudents(
        Array.isArray(data?.students)
          ? data.students
          : []
      );
    } catch (err) {
      console.error("Students Error:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) => {
      const text = `
        ${student?.name || ""}
        ${student?.email || ""}
        ${student?.university || ""}
        ${student?.degree || ""}
        ${student?.internship_track || ""}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    }
  );

  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            HR Management
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Students
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage registered students.
          </p>
        </div>

        <button
          onClick={loadStudents}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      {/* SEARCH */}

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

        <Search
          size={19}
          className="text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by name, email, university..."
          className="w-full bg-transparent text-sm outline-none"
        />

      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-2xl bg-slate-200"
              />
            )
          )}

        </div>
      ) : filteredStudents.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <Users
            size={40}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No students found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Try another search.
          </p>

        </div>

      ) : (

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {filteredStudents.map(
            (student, index) => (

              <div
                key={
                  student.student_id ||
                  student.id ||
                  index
                }
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                    {(
                      student?.name ||
                      "S"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Student
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {student?.name ||
                    "Unnamed Student"}
                </h3>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {student?.email ||
                    "No email"}
                </p>

                <div className="mt-4 space-y-2 text-sm">

                  <p className="text-slate-600">
                    <span className="font-semibold">
                      University:
                    </span>{" "}
                    {student?.university ||
                      "N/A"}
                  </p>

                  <p className="text-slate-600">
                    <span className="font-semibold">
                      Degree:
                    </span>{" "}
                    {student?.degree ||
                      "N/A"}
                  </p>

                  <p className="text-slate-600">
                    <span className="font-semibold">
                      Track:
                    </span>{" "}
                    {student?.internship_track ||
                      "N/A"}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/hr/students/${
                        student.student_id ||
                        student.id
                      }`
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  <Eye size={17} />
                  View Profile
                </button>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default HRStudents;