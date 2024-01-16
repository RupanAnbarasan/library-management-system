import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.login?.isAuthenticated);
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated, nav]);

  return (
    <div className="container-full">  
      <div className="side-content">
      {isAuthenticated ? <Outlet /> : null}
      </div>
    </div >
  );
};

export default PrivateRoute;