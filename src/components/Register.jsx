import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../appwrite/authService";
import { Input, Button, Logo } from "../components/index";
import { login } from "../store/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onRegister = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    // setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        toast.success("Account created successfully");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
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
          Sign Up for a new account
        </h2>

        <p className="mt-1 text-center text-base text-secondary-white">
          {" "}
          Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-800 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onRegister)} className="mt-2">
          <div className="space-y-5">
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
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
              })}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-4 bg-gradient text-black py-[3px] font-medium hover:opacity-90 duration-300 transition-all ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
