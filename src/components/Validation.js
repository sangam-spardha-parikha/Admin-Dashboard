import { useState } from "react";

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email) ? "" : "Invalid email format";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    const regex = /^[0-9]{10}$/;
    return regex.test(phone) ? "" : "Invalid phone number";
  };

  const validatePassword = (password, isLogin = false) => {
    if (isLogin) return ""; // Skip validation for login page
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    return "";
  };

  const validatePostalCode = (postalCode) => {
    if (!postalCode) return "Postal code is required";
    const regex = /^[0-9]{6}$/;
    return regex.test(postalCode) ? "" : "Invalid postal code";
  };

  const validateField = (name, value, isLogin = false) => {
    let error = "";
    switch (name) {
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        error = validatePassword(value, isLogin);
        break;
      case "postalCode":
        error = validatePostalCode(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return { errors, validateField };
};
