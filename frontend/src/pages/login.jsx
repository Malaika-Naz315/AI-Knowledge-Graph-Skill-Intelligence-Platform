
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authApi";

function Login() {
  const navigate = useNavigate();

  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // FORMAT API ERROR
  // ==========================================

  const getErrorMessage = (err) => {
    const detail = err?.response?.data?.detail;

    // FastAPI validation error
    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          if (item?.msg) {
            return item.msg;
          }

          return "Invalid input";
        })
        .join(", ");
    }

    if (typeof detail === "string") {
      return detail;
    }

    if (detail && typeof detail === "object") {
      return detail.msg || "Invalid login information.";
    }

    if (err?.response?.status === 401) {
      return "Invalid email or password.";
    }

    if (err?.response?.status === 422) {
      return "Please enter a valid email and password.";
    }

    if (err?.response?.status === 404) {
      return "Login API was not found. Please check the backend.";
    }

    if (!err?.response) {
      return "Unable to connect to the backend server.";
    }

    return "Login failed. Please try again.";
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login Response:", data);

      // ========================================
      // CHECK TOKEN
      // ========================================

      if (!data?.access_token) {
        setError(
          "Login response did not contain an access token."
        );
        return;
      }

      // ========================================
      // CHECK USER
      // ========================================

      if (!data?.user) {
        setError(
          "Login response did not contain user information."
        );
        return;
      }

      // ========================================
      // SAVE AUTH
      // ========================================

      authLogin(
        data.user,
        data.access_token
      );

      // ========================================
      // ROLE
      // ========================================

      const role = String(
        data.user.role || ""
      ).toLowerCase();

      console.log("Logged in user:", data.user);
      console.log("User role:", role);

      // ========================================
      // REDIRECT
      // ========================================

      if (role === "hr" || role === "admin") {
        navigate("/hr/dashboard", {
          replace: true,
        });
      } else {
        navigate("/dashboard", {
          replace: true,
        });
      }

    } catch (err) {
      console.error("Login Error:", err);

      setError(getErrorMessage(err));

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-2xl font-bold text-white shadow-lg">
            AI
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            AI Knowledge Graph & Skill Intelligence Platform
          </p>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* ======================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hr@ezitech.com"
              autoComplete="email"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-slate-900
                outline-none
                transition
                focus:border-blue-600
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-slate-900
                outline-none
                transition
                focus:border-blue-600
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? "Logging In..." : "Login"}

          </button>

        </form>

        {/* ======================================
            SIGNUP
        ====================================== */}

        <div className="mt-7 border-t border-slate-200 pt-6 text-center">

          <p className="text-sm text-slate-500">
            Don't have an account?
          </p>

          <Link
            to="/signup"
            className="mt-2 inline-block font-semibold text-blue-600 transition hover:text-indigo-700 hover:underline"
          >
            Create New Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;

