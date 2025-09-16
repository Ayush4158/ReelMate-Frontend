import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginPartner } from "../../slices/AuthSlice";

const FoodPartnerRegister = () => {
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/partner/register`,
        {
          name,
          contactName,
          phone,
          email,
          address,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        dispatch(loginPartner(res.data.foodPartner))
        localStorage.setItem("authPartner", JSON.stringify(res.data.foodPartner))
        localStorage.removeItem("authUser")
        navigate('/create-food')
      }
    } catch (error) {
      console.error("Frontend Error during partner registration: ", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Partner Sign Up
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Grow your business with our platform.
          </p>
        </header>

        {/* Switch Nav */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 text-center">
          <strong>Switch:</strong>{" "}
          <Link to="/user/register" className="text-blue-600 hover:underline">
            User
          </Link>{" "}
          •{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-600 hover:underline"
          >
            Food Partner
          </Link>
        </nav>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Business Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Tasty Bites"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Contact Name
              </label>
              <input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                placeholder="Jane Doe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+1 555 123 4567"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="business@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Create password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="123 Market Street"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              Full address helps customers find you faster.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Create Partner Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already a partner?{" "}
          <Link to="/food-partner/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
