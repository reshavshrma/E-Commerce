// utils/validateForm.js
export const validateLoginForm = (formData) => {
    const errors = {};
    const { email, password } = formData;
  
    if (!email.trim()) errors.email = "Email is required!";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Invalid email format!";
  
    if (!password.trim()) errors.password = "Password is required!";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters!";
  
    return errors;
  };
  