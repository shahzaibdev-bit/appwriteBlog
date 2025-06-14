import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const session = await authService.login(formData);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#0f0f1b]">
      <div className="w-full max-w-md p-6 rounded-2xl  bg-[#161622] border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-500">
          Maxton
        </h1>
        <h2 className="text-xl font-semibold text-center mt-2 text-white">
          Sign in to your account
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Don’t have an account?{" "}
          <span
            className="text-purple-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email:
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-300"
            >
              Password:
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}
