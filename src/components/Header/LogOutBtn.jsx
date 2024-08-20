import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { authService } from "../../appwrite/authService";
import toast, { Toaster } from "react-hot-toast";

export const LogOutBtn = () => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success("Logged out successfully");
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <button onClick={logOutHandler} className="btn_style">
        Logout
      </button>
    </>
  );
};
