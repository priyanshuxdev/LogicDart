import React, { useState } from "react";
import { Button, LogOutBtn } from "./index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { authService } from "../appwrite/authService";
import { useSelector } from "react-redux";
import { Sling as Hamburger } from "hamburger-react";
import toast, { Toaster } from "react-hot-toast";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success("Logged out successfully");
    });
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      isActive: true,
    },
    {
      name: "Sign In",
      slug: "/signin",
      isActive: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      isActive: !authStatus,
    },
    {
      name: "Blogs",
      slug: "/all-blog",
      isActive: authStatus,
    },
    {
      name: "Compose",
      slug: "/add-blog",
      isActive: authStatus,
    },
  ];

  return (
    <>
      <Toaster position="top-center" />
      <div
        className={`fixed top-0 right-0 bg-black/85 h-60 w-60 flex flex-col justify-center align-center mx-auto text-center gap-3 rounded-lg sm:hidden transform transition-transform border-b border-secondary-white duration-500 mt-3 z-10 ${
          isOpen === false ? "translate-x-full -translate-y-full" : ""
        } `}
      >
        {navItems.map((item) =>
          item.isActive ? (
            <p key={item.name}>
              <p
                onClick={() => navigate(item.slug)}
                className="text-xl font-lato text-white cursor-pointer hover:underline hover:font-semibold hover:scale-100 transition-all duration-300"
              >
                {item.name}
              </p>
            </p>
          ) : null
        )}
        {authStatus && (
          <span>
            <LogOutBtn logOut={logOutHandler} />
          </span>
        )}
      </div>

      <div className="max-sm:hidden">
        <ul className="flex gap-6 ">
          {navItems.map((item) =>
            item.isActive ? (
              <li key={item.name}>
                <Button
                  onClick={() => navigate(item.slug)}
                  className="btn_style"
                >
                  {item.name}
                </Button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogOutBtn />
            </li>
          )}
        </ul>
      </div>

      <div className="sm:hidden z-20">
        <Hamburger
          toggled={isOpen}
          toggle={() => setIsOpen((prev) => !prev)}
          size={26}
          direction="left"
          duration={0.8}
        />
      </div>
    </>
  );
};

export default HomeNav;
