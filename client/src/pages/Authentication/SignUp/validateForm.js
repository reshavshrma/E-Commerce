// utils/validateForm.js

export const validateForm = (formData, fields = []) => {
    const errors = {};
  
    fields.forEach((field) => {
      const value = formData[field]?.trim();
  
      switch (field) {
        case "name":
          if (!value) errors.name = "Name is required";
          else if (value.length < 3) errors.name = "Name must be at least 3 characters";
          break;
  
        case "email":
          if (!value) errors.email = "Email is required";
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = "Invalid email format";
          break;
  
        case "phone":
          if (!value) errors.phone = "Phone number is required";
          else if (!/^\d{10}$/.test(value)) errors.phone = "Phone number must be 10 digits";
          break;
  
        case "password":
          if (!value) errors.password = "Password is required";
          else if (value.length < 6) errors.password = "Password must be at least 6 characters";
          break;
  
        default:
          break;
      }
    });
  
    return errors;
  };
  