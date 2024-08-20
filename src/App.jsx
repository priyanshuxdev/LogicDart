import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/slices/authSlice.js";
import { authService } from "./appwrite/authService.js";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login({ userData })) : dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen overflow-hidden bg-[#090912]">
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
