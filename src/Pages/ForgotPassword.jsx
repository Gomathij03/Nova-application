import React, { useState } from "react";
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";
import "./ForgotPassword.css";

function ForgotPassword({ onBackToLogin }) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= VERIFY EMAIL ================= */

 const handleVerifyEmail = (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  const enteredEmail = email.trim().toLowerCase();

  if (!enteredEmail) {
    setError("Please enter your email address.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
    setError("Please enter a valid email address.");
    return;
  }

  const savedUsers = JSON.parse(
    localStorage.getItem("novaUsers") || "[]"
  );

  const existingUser = savedUsers.find(
    (user) =>
      user.email?.toLowerCase() === enteredEmail
  );

  if (!existingUser) {
    setError(
      "No account found. Please check your email address."
    );
    return;
  }

  setStep(2);
};

  /* ================= RESET PASSWORD ================= */

  const handleResetPassword = (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!newPassword) {
    setError("Please enter a new password.");
    return;
  }

  if (newPassword.length < 6) {
    setError("Password must contain at least 6 characters.");
    return;
  }

  if (!confirmPassword) {
    setError("Please confirm your new password.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  const savedUsers = JSON.parse(
    localStorage.getItem("novaUsers") || "[]"
  );

  const updatedUsers = savedUsers.map((user) =>
    user.email?.toLowerCase() === email.trim().toLowerCase()
      ? {
          ...user,
          password: newPassword,
        }
      : user
  );

  localStorage.setItem(
    "novaUsers",
    JSON.stringify(updatedUsers)
  );

  setSuccess("Your password has been reset successfully.");
  setStep(3);
};

  /* ================= SUCCESS ================= */

  if (step === 3) {
    return (
      <main className="forgot-password-page">

        <div className="forgot-password-card">

          <div className="forgot-success-icon">
            <FiCheckCircle />
          </div>

          <p className="forgot-eyebrow">
            NOVA ACCOUNT
          </p>

          <h1>
            Password Updated
          </h1>

          <p className="forgot-description">
            Your password has been successfully
            updated. You can now sign in using
            your new password.
          </p>

          <button
            type="button"
            className="forgot-primary-button"
            onClick={onBackToLogin}
          >
            Continue to Login
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="forgot-password-page">

      <div className="forgot-password-card">

        {/* ================= BACK ================= */}

        <button
          type="button"
          className="forgot-back-button"
          onClick={onBackToLogin}
        >
          <FiArrowLeft />
          Back to Login
        </button>

        {/* ================= HEADER ================= */}

        <div className="forgot-header">

          <div className="forgot-icon">
            {step === 1 ? (
              <FiMail />
            ) : (
              <FiLock />
            )}
          </div>

          <p className="forgot-eyebrow">
            NOVA ACCOUNT
          </p>

          <h1>
            {step === 1
              ? "Forgot Password?"
              : "Create New Password"}
          </h1>

          <p className="forgot-description">
            {step === 1
              ? "Enter your registered email address to reset your password."
              : "Create a new password for your NOVA account."}
          </p>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        {/* ================= STEP 1 ================= */}

        {step === 1 && (

          <form
            className="forgot-form"
            onSubmit={handleVerifyEmail}
          >

            <label>
              Email Address
            </label>

            <div className="forgot-input-wrapper">

              <FiMail />

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />

            </div>

            <button
              type="submit"
              className="forgot-primary-button"
            >
              Continue
            </button>

          </form>

        )}

        {/* ================= STEP 2 ================= */}

        {step === 2 && (

          <form
            className="forgot-form"
            onSubmit={handleResetPassword}
          >

            {/* NEW PASSWORD */}

            <label>
              New Password
            </label>

            <div className="forgot-input-wrapper">

              <FiLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(
                    e.target.value
                  );
                  setError("");
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

            {/* CONFIRM PASSWORD */}

            <label>
              Confirm Password
            </label>

            <div className="forgot-input-wrapper">

              <FiLock />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(
                    e.target.value
                  );
                  setError("");
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

            <p className="password-help">
              Password must contain at least 6
              characters.
            </p>

            <button
              type="submit"
              className="forgot-primary-button"
            >
              Reset Password
            </button>

          </form>

        )}

      </div>

    </main>
  );
}

export default ForgotPassword;