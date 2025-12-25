import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: { msg, redirect },
      });
    }
  }, [user]); // ✅ Only depends on user

  return children; // ✅ Always return children
};

export default ProtectedRoute;
