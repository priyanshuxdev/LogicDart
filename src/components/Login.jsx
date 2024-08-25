import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/slices/authSlice";
import { authService } from "../appwrite/authService";
import { Input, Button, Logo } from "../components/index";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onLogin = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    // setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          toast.success("Logged in successfully");
          navigate("/");
        } else toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Toaster position="top-center" />
      <div className={`mx-auto px-8 pb-8 text-gradient`}>
        <div className="mb-4 text-center pr-4">
          <span className="inline-block w-[50px] h-[50px]">
            <Logo />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign In to your account
        </h2>

        <p className="mt-1 text-center text-base text-secondary-white">
          {" "}
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-800 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onLogin)} className="mt-2">
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-4 bg-gradient text-black py-[3px] font-medium hover:opacity-90 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
