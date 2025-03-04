import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState } from "react";

function ProtectedRoute({ children }) {
  const [isAurhorized, setIsAurhorized] = useState(false);

  const refreshToken = async () => {};

  const auth = async () => {};

  if (isAurhorized == null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return isAurhorized ? children : <Navigate to="/login" />;
}
