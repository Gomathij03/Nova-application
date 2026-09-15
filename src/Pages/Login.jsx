import React, { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import "./Login.css";

function Login({
  onLogin,
  onSwitchToSignup,
  onForgotPassword,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("novaUsers") || "[]"
    );

    const user = savedUsers.find(
      (item) =>
        item.email.toLowerCase() ===
          formData.email.toLowerCase() &&
        item.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "novaCurrentUser",
      JSON.stringify(user)
    );

    if (onLogin) {
      onLogin(user);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          NOVA
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Sign in to NOVA
          </h1>

          <p>
            Continue your shopping journey and discover
            something you’ll love.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <div className="input-wrapper">
              <FiMail className="input-icon" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">
              <FiLock className="input-icon" />

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <button
              type="button"
              className="forgot-password-link"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* Sign In */}
          <button
            type="submit"
            className="auth-submit"
          >
            Sign In
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Signup */}
        <p className="auth-switch">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
          >
            Create account
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;