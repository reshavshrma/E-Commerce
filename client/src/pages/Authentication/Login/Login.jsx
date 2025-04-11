import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import InputField from "./InputField";
import { useUser } from "../../../components/UserContext/UserContext";
import { FaEnvelope } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { validateLoginForm } from "./validateForm";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = {
    email: useRef(),
    password: useRef(),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm(loginUser);
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        loginUser,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const userData = response.data.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoginUser({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.details) {
        const backendErrors = error.response.data.details.reduce((acc, msg) => {
          if (msg.toLowerCase().includes("email")) acc.email = msg;
          else if (msg.toLowerCase().includes("password")) acc.password = msg;
          else acc.global = msg;
          return acc;
        }, {});
        setFormErrors(backendErrors);
      } else {
        setFormErrors({
          global: error.response?.data?.message || "Login failed! Try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Please login to your account</p>

        {formErrors.global && (
          <p className="text-center text-red-500 font-medium text-sm">{formErrors.global}</p>
        )}

        <form onSubmit={handleSubmitForm} className="space-y-5">
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginUser.email}
            onChange={handleInputChange}
            error={formErrors.email}
            icon={<FaEnvelope />}
            ref={inputRefs.email}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginUser.password}
            onChange={handleInputChange}
            error={formErrors.password}
            icon={<BsShieldLockFill />}
            ref={inputRefs.password}
          />

          <div className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <NavLink
              to="/user/register"
              className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
            >
              Sign Up
            </NavLink>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-xl text-white font-semibold transition duration-300 ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="animate-pulse">Verifying...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
