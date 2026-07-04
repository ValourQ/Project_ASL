import { useState } from "react";
import supabase from "../supabase";
import logo from "../assets/signsync-logo.png";
import "../styles/Auth.css";
import { Eye, EyeOff } from "lucide-react"; //eye icon
export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleAuth = async () => {
    setError("");
    setMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (mode === "signup") {
      if (!fullName.trim()) {
        setError("Full name is required");
        return;
      }

      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      if (!emailRegex.test(email)) {
        setError("Please enter a valid email");
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      if (!passwordRegex.test(password)) {
        setError(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one special character."
        );
        return;
      }

      if (!confirmPassword.trim()) {
        setError("Please confirm your password");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    if (mode === "signin") {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      if (!emailRegex.test(email)) {
        setError("Please enter a valid email");
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        return;
      }
    }

    setLoading(true);

    try {
      let result;

      if (mode === "signup") {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      const { data, error } = result;

      if (error) {
        if (error.message.includes("invalid format")) {
          setError("Please enter a valid email address.");
        } else if (
          error.message.includes("Invalid login credentials")
        ) {
          setError("Incorrect email or password.");
        } else if (
          error.message.includes("User already registered")
        ) {
          setError("An account with this email already exists.");
        } else if (
          error.message.includes("Email not confirmed")
        ) {
          setError("Please verify your email before signing in.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        onLogin(data.user);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  
  const handleForgotPassword = async () => {
  setError("");
  setMessage("");

  if (!email.trim()) {
    setError("Please enter your email first");
    return;
  }

  const { error } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

  if (error) {
    setMessage("");
    setError(error.message);
  } else {
    setError("");
    setMessage("Password reset email sent. Check your inbox.");
  }
};

const switchMode = () => {
  setMode(mode === "signin" ? "signup" : "signin");
  setError("");
  setMessage("");
};

  return (
    <div className="auth-page">
      <div className="left-panel">
        <div className="brand">
          <img src={logo} alt="SignSync" />
          <span>SignSync</span>
          <span></span>
          <span>
          
          </span>
        </div>

        <div className="hero-content">
          <h1>Communication without barriers.</h1>

          <p>
            Join a platform built to interpret and generate sign language —
            accessible, modern, and ready for AI.
          </p>
        </div>

        <div >
          Internship-Project
        </div>
      </div>

      <div className="right-panel">
        <div className="auth-card">
          <h1>
            {mode === "signin"
              ? "Welcome back"
              : "Create your account"}
          </h1>

          <p className="auth-subtitle">
            {mode === "signin"
              ? "Sign in to continue to SignSync."
              : "Start interpreting and generating sign language."}
          </p>

          {mode === "signup" && (
            <>
              <label>Full Name</label>
              <input
                className="input"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </>
          )}

          <label>Email</label>
          <input
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-row">
            <label>Password</label>

            {mode === "signin" && (
              <button
                type="button"
                className="forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            )}
          </div>

          <div className="password-wrapper">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

          {mode === "signup" && (
            <>
              <label>Confirm Password</label>

              <div className="password-wrapper">
                <input
                  className="input"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </>
          )}

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {message && (
             <p className="success">
               {message}
             </p>
          )}

          <button
            className="mainBtn"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>


          <p className="switch-text">
            {mode === "signin"
              ? "New here?"
              : "Already have an account?"}

            <button
              className="switch-btn"
              onClick={switchMode}
            >
              {mode === "signin"
                ? "Create an account"
                : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}



