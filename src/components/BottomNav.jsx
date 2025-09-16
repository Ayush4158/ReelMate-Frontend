import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const [partnerId, setPartnerId] = useState("");

  useEffect(() => {
    const partner = localStorage.getItem("authPartner");
    if (partner) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me/partner`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200 && res.data.foodPartner) {
            setPartnerId(res.data.foodPartner._id);
          }
        })
        .catch((err) => {
          console.error("Error fetching partner:", err);
        });
    }
  }, []); 

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-md z-50"
      role="navigation"
      aria-label="Bottom"
    >
      <div className="flex justify-around items-center h-14">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
            }`
          }
        >
          <span className="w-6 h-6 mb-0.5">
            {/* Home Icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
            </svg>
          </span>
          <span>Home</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
            }`
          }
        >
          <span className="w-5 h-5 mb-0.5">
            {/* Bookmark Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <span>Saved</span>
        </NavLink>

        {/* Create */}
        { partnerId &&
          <NavLink
          to="/create-food"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
            }`
          }
        >
          <span className="w-6 h-6 mb-0.5">
            {/* Plus Circle Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </span>
          <span>Create</span>
        </NavLink>
        }
      </div>
    </nav>
  );
};

export default BottomNav;
