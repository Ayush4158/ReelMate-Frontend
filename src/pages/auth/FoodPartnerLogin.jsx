import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginPartner } from "../../slices/AuthSlice";

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/partner/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(loginPartner(res.data.foodPartner))
        localStorage.setItem("authPartner", JSON.stringify(res.data.foodPartner))
        localStorage.removeItem("authUser")
        navigate("/");
      }
    } catch (error) {
      console.error("Frontend Error during partner login: ", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Partner Login
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access your dashboard and manage orders
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="business@example.com"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          New partner?{" "}
          <Link
            to="/food-partner/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
