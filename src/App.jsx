import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { loginUser, loginPartner, logoutUser, logoutPartner } from "./slices/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      // ✅ Check User Session
      try {
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me/user`, {
          withCredentials: true,
        });
        if (userRes.data.user) {
          dispatch(loginUser(userRes.data.user));
          localStorage.setItem("authUser", JSON.stringify(userRes.data.user));
        }
      } catch (err) {
        dispatch(logoutUser());
        localStorage.removeItem("authUser");
      }

      // ✅ Check Partner Session
      try {
        const partnerRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me/partner`, {
          withCredentials: true,
        });
        if (partnerRes.data.foodPartner) {
          dispatch(loginPartner(partnerRes.data.foodPartner));
          localStorage.setItem("authPartner", JSON.stringify(partnerRes.data.foodPartner));
        }
      } catch (err) {
        // Only clear partner state if partner session is invalid
        dispatch(logoutPartner());
        localStorage.removeItem("authPartner");
      }
    };

    checkSession();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
