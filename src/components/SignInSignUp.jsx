// SignInSignUpPage.js

import React, { useState } from "react";
import axios from "axios";
import "./SignInSignUp.css";
import video from "./images/bg_video.mp4";
import logoImage from "./images/logo.png";
const SignInSignUpPage = ({ onLoginSuccess }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpOption, setSignUpOption] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
    setError("");
  };

  const handleSignIn = async () => {
    // Implement your sign-in logic here
  };

  const handleSignUp = async () => {
    // Implement your sign-up logic here
  };

  const handleOTPValidation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/otp/validate",
        {
          email,
          otp,
        }
      );
      console.log(response.data); // This should print the response from the server
      const { token, userId } = response.data;

      // Save the token and user ID in local storage or a state variable
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      onLoginSuccess(); // Call the onLoginSuccess function passed as a prop
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const sendOTP = async () => {
    setOtpSent(true);
  };

  return (
    <div className="body">
      <img src={logoImage} alt="Logo" className="logo" />
      <div className={`cont ${showSignUp ? "s-sign-up" : ""}`}>
        {!showSignUp && (
          <div className="video video-right">
            <video autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}
        <div className={`form ${showSignUp ? "sign-up" : "sign-in"}`}>
          {showSignUp && !otpSent && (
            <div className="form-content sign-up">
              <h2>Sign Up</h2>

              <label className="label">
                <span className="span">Name</span>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="label">
                <span className="span">WOXSEN Mail</span>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="label">
                <span className="span">Password</span>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label className="label">
                <span className="span">Confirm Password</span>
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <label className="label">
                <span className="span">Sign Up As</span>
                <select
                  className="input"
                  value={signUpOption}
                  onChange={(e) => setSignUpOption(e.target.value)}
                >
                  <option value="client">Client</option>
                  <option value="university">University</option>
                </select>
              </label>
              <button type="button" className="submit" onClick={sendOTP}>
                Send OTP
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
          {showSignUp && otpSent && (
            <div className="form-content sign-up">
              <h2>Verify Email</h2>
              <label className="label">
                <span className="span">Enter OTP</span>
                <input
                  className="input"
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </label>
              <button type="button" className="submit" onClick={handleSignUp}>
                Verify OTP
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
          {!showSignUp && (
            <div className="form-content sign-in">
              <h2>Sign In</h2>
              <label className="label">
                <span className="span">WOXSEN Email Address</span>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="label">
                <span className="span">Password</span>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button className="submit" type="button" onClick={handleSignIn}>
                Sign In
              </button>

              {error && <p className="error">{error}</p>}
              <label>If not registered yet</label>
              <span className="link" onClick={handleToggleForm}>
                Sign Up
              </span>
            </div>
          )}
        </div>
        {showSignUp && (
          <div className="video">
            <video autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInSignUpPage;
