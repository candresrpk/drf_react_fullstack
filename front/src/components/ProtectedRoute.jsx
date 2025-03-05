import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAurhorized, setIsAurhorized] = useState(false);

  useEffect(() => {
    auth().catch(() => setIsAurhorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshT = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/accounts/refresh/", {
        refresh: refreshT,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAurhorized(true);
      } else {
        setIsAurhorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAurhorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAurhorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAurhorized(true);
    }
  };

  if (isAurhorized == null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return isAurhorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
