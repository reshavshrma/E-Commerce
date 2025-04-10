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

    if (inputRefs[name]?.current) {
      inputRefs[name].current.style.color = value ? "white" : "black";
      inputRefs[name].current.style.textAlign = "center";
      inputRefs[name].current.style.backgroundColor = "#5454544f";
    }
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
          global: error.response?.data?.message || "Failed to login! Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-4 lg:p-5" onSubmit={handleSubmitForm}>
      {formErrors.global && <ErrorMessage message={formErrors.global} />}

      <InputField
        type="email"
        name="email"
        placeholder="please enter your email"
        value={loginUser.email}
        onChange={handleInputChange}
        error={formErrors.email}
        icon={<FaEnvelope />}
        ref={inputRefs.email}
      />
      {formErrors.email && (
        <p className="text-red-500 text-sm text-center">{formErrors.email}</p>
      )}

      <InputField
        type="password"
        name="password"
        placeholder="please enter your password"
        value={loginUser.password}
        onChange={handleInputChange}
        error={formErrors.password}
        icon={<BsShieldLockFill />}
        ref={inputRefs.password}
      />
      {formErrors.password && (
        <p className="text-red-500 text-sm text-center">{formErrors.password}</p>
      )}

      <div className="text-center text-gray-400 mt-2 text-sm sm:text-base">
        <span>Don’t have an account? </span>
        <NavLink to="/user/register" className="text-sky-500 hover:underline">
          Register
        </NavLink>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full border-gray-500 border-2 font-semibold px-4 py-2 text-white rounded-xl mt-4 ${
          isLoading ? "bg-gray-800 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        } flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-green-400 animate-pulse">Verifying...</span>
          </>
        ) : (
          "Verify Now"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
