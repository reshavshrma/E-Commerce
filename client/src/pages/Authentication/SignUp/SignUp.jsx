import React, { useState } from "react";
import InputField from "./InputField";
import { validateForm } from "./validateForm";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../components/UserContext/userContext";
const Signup = () => {
  const {setUser} = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // ✅ this line updates the actual field
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateForm(
      formData,
      ["name", "email", "phone", "password"]
    );


    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        formData,
        { withCredentials: true }
      );
      // After successful registration, update the UserContext immediately
    const { user } = res.data.data; // Assuming the user data is here
    setUser(user);  // Directly update the user context
    console.log("User registered:", res.data);
      console.log("User registered:", res.data);
      navigate("/auth/successfully");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create your Account
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            icon={FaUser}
            error={errors.name}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            icon={FaEnvelope}
            error={errors.email}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
            icon={FaPhone}
            error={errors.phone}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon={FaLock}
            error={errors.password}
          />

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              className="mt-1"
            />
            <label htmlFor="agreeToTerms" className="text-gray-600">
              I agree to the{" "}
              <a
                href="/policies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
          )}

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
>
  {loading ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Signing up...
    </>
  ) : (
    "Sign Up"
  )}
</button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
