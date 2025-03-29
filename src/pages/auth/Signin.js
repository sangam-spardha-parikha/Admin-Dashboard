import { useContext, useState } from "react";
import { useValidation } from "./../../components/Validation";
import { InputField } from "./../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { showAlertSuccess } from "../../components/Alert";
import './Auth.css';

const LoginForm = () => {
  const { handleLogin } = useAuth();
  const { errors, validateField } = useValidation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [device, setDevice] = useState(""); // Track device name for login


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fields = [
    { label: "Email", type: "email", name: "email", value: formData.email, required: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name !== "password") validateField(name, value); // Skip password validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData, device);
      showAlertSuccess("Login Successfully!", "success");
     
        window.location.href = "/home"; // Navigate to dashboard after successful login
     
    } catch (error) {
      alert("Invalid credentials");

    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row login-container w-100">
        <div className="col-md-6 text-start">
          <h2 className="fw-bold mb-5 pb-5">Welcome Back!</h2>


          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                errors={errors}
              />
            ))}

            {/* Password Field with Show/Hide Icon */}
            <div className="position-relative">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control mb-3"
                  style={{ borderRadius: "25px", padding: "12px" }}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="position-absolute end-0 top-50 translate-middle-y pe-3 pb-3 fs-3"
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>

            <button className="btn btn-primary w-100 btn-signin mt-4">Sign In →</button>
          </form>


        </div>

        <div className="col-md-6 d-none d-md-block illustration text-center">
          <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?ga=GA1.1.571894306.1703328841&semt=ais_hybrid" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
