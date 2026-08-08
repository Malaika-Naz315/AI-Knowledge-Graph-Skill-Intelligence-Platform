import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Users,
  RefreshCw,
  UserRound,
} from "lucide-react";

import {
  getHRMentors,
} from "../../services/hrApi";


const HRMentors = () => {
  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHRMentors();

      setMentors(
        Array.isArray(data?.mentors)
          ? data.mentors
          : []
      );
    } catch (err) {
      console.error(
        "Mentors Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load mentors."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();
  }, []);

  const filteredMentors = mentors.filter(
    (mentor) => {
      const text = `
        ${mentor?.name || ""}
        ${mentor?.email || ""}
        ${mentor?.specialization || ""}
        ${mentor?.expertise || ""}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    }
  );

  return (
    <div className="p-6 lg:p-8">

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            HR Management
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Mentors
          </h1>

          <p className="mt-2 text-slate-500">
            Explore mentors and their assigned students.
          </p>
        </div>

        <button
          onClick={loadMentors}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

        <Search
          size={19}
          className="text-slate-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search mentors..."
          className="w-full bg-transparent outline-none"
        />

      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-2xl bg-slate-200"
              />
            )
          )}

        </div>
      ) : filteredMentors.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <Users
            size={42}
            className="mx-auto text-slate-300"
          />

          <p className="mt-4 font-semibold text-slate-700">
            No mentors found
          </p>

        </div>

      ) : (

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {filteredMentors.map(
            (mentor, index) => {

              const mentorId =
                mentor?.mentor_id ||
                mentor?.id;

              return (
                <div
                  key={
                    mentorId ||
                    index
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <UserRound size={25} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {mentor?.name ||
                          "Mentor"}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {mentor?.email ||
                          "No email"}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 space-y-2">

                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">
                        Expertise:
                      </span>{" "}
                      {mentor?.expertise ||
                        mentor?.specialization ||
                        "N/A"}
                    </p>

                  </div>

                  {mentorId && (
                    <button
                      onClick={() =>
                        navigate(
                          `/hr/mentors/${mentorId}`
                        )
                      }
                      className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      View Mentor Students
                    </button>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
};

export default HRMentors;