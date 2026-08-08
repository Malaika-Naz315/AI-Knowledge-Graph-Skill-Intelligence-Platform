import {
  useEffect,
  useState,
} from "react";

import {
  RefreshCw,
  TrendingUp,
  Code2,
  BarChart3,
} from "lucide-react";

import {
  getHRAnalytics,
} from "../../services/hrApi";


const HRAnalytics = () => {
  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getHRAnalytics();

      setAnalytics(
        data?.analytics || {}
      );
    } catch (err) {
      console.error(
        "Analytics Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const skills = Array.isArray(
    analytics?.top_skills
  )
    ? analytics.top_skills
    : [];

  const technologies =
    Array.isArray(
      analytics?.top_technologies
    )
      ? analytics.top_technologies
      : [];

  const getName = (item) => {
    if (typeof item === "string") {
      return item;
    }

    return (
      item?.name ||
      item?.skill ||
      item?.skill_name ||
      item?.technology ||
      item?.technology_name ||
      "Unknown"
    );
  };

  const getValue = (item) => {
    if (typeof item === "number") {
      return item;
    }

    return (
      item?.count ??
      item?.total ??
      item?.frequency ??
      item?.students ??
      0
    );
  };

  const maxValue = (items) => {
    const values = items.map(
      getValue
    );

    return Math.max(
      ...values,
      1
    );
  };

  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-600">
            Intelligence Center
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            HR Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            AI-powered insights from the Knowledge Graph.
          </p>
        </div>

        <button
          onClick={loadAnalytics}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />

        </div>
      ) : (

        <div className="grid gap-6 lg:grid-cols-2">

          {/* TOP SKILLS */}

          <AnalyticsPanel
            title="Top Skills"
            icon={TrendingUp}
            data={skills}
            getName={getName}
            getValue={getValue}
            max={maxValue(skills)}
          />

          {/* TECHNOLOGIES */}

          <AnalyticsPanel
            title="Top Technologies"
            icon={Code2}
            data={technologies}
            getName={getName}
            getValue={getValue}
            max={maxValue(technologies)}
          />

        </div>
      )}

      {/* SUMMARY */}

      {!loading && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <SummaryCard
            icon={BarChart3}
            title="Skills Tracked"
            value={skills.length}
          />

          <SummaryCard
            icon={Code2}
            title="Technologies Tracked"
            value={technologies.length}
          />

        </div>
      )}

    </div>
  );
};


const AnalyticsPanel = ({
  title,
  icon: Icon,
  data,
  getName,
  getValue,
  max,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

    <div className="mb-6 flex items-center gap-3">

      <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="font-bold text-slate-900">
          {title}
        </h2>

        <p className="text-xs text-slate-500">
          Knowledge Graph frequency
        </p>
      </div>

    </div>

    {data.length === 0 ? (
      <div className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
        No analytics data available.
      </div>
    ) : (
      <div className="space-y-5">

        {data
          .slice(0, 10)
          .map((item, index) => {

            const value =
              getValue(item);

            const percentage =
              Math.max(
                5,
                Math.min(
                  100,
                  (value / max) * 100
                )
              );

            return (
              <div key={index}>

                <div className="mb-2 flex justify-between text-sm">

                  <span className="font-semibold text-slate-700">
                    {getName(item)}
                  </span>

                  <span className="font-bold text-slate-900">
                    {value}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

      </div>
    )}

  </div>
);


const SummaryCard = ({
  icon: Icon,
  title,
  value,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {value}
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
        <Icon size={22} />
      </div>

    </div>

  </div>
);


export default HRAnalytics;