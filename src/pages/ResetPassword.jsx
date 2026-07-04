import { useState } from "react";
import supabase from "../supabase";
import "../styles/ResetPassword.css";
import { Eye, EyeOff } from "lucide-react"; //eye icon

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async () => {
    setError("");
    setMessage("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError("Unable to update password. Please try again.");
    } else {
      setMessage("Your password has been updated successfully.");
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
  <h1>Reset Password</h1>

  {!message ? (
    <>
      <div className="password-wrapper">
        <input
          className="reset-input"
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="password-wrapper">
        <input
          className="reset-input"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="button"
          className="eye-btn"
          onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        >
          {showConfirmPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <button
        className="reset-btn"
        onClick={handleReset}
      >
        <b>Update Password</b>
      </button>
    </>
  ) : (
    <>
      <p className="success">
        {message}
      </p>

      <button
        className="reset-btn"
        onClick={() => (window.location.href = "/")}
      >
        Sign In Again
      </button>
    </>
  )}
</div>
  
</div>
  )
};