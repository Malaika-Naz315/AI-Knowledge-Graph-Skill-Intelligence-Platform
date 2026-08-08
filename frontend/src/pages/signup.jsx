import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authApi";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await signup(formData);

      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.detail || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          HR Signup
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Create HR Admin Account
        </p>

        {message && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="HR Admin"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hr@ezitech.com"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-sm text-slate-600">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;