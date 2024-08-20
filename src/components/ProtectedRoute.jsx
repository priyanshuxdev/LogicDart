import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState(true);
  const userStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && userStatus !== authentication) {
      navigate("/signin");
    } else if (!authentication && userStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [userStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};
