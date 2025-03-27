import React, { useState, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import Webcam from "react-webcam";
import "./styles.css";

// Signup Component
const Signup = ({ onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });

      if (response.data.success) {
        setSuccessMessage("Account created successfully! Please login.");
        setTimeout(() => {
          onBackToLogin();
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "Error creating account");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 
        `Error creating account: ${err.message}. Please make sure the backend server is running.`
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Create New Account</h2>
      {errorMessage && (
        <div className="error-message">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          ✅ {successMessage}
        </div>
      )}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p className="auth-link">
        Already have an account?{" "}
        <span onClick={onBackToLogin} className="link-text">
          Login here
        </span>
      </p>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ username }) => {
  return (
    <div className="dashboard">
      <h1>Secure Authentication Module for OS</h1>
      
      <div className="project-info">
        <h2>About the Project</h2>
        <p>A robust multi-factor authentication system that combines traditional password security with modern biometric verification and time-based OTP validation. This system ensures the highest level of security through a three-step verification process.</p>
      </div>

      <div className="developer-cards">
        <div className="dev-card">
          <img src="/dev1.jpg" alt="Developer 1" className="dev-image"/>
          <h3>Cahal Agarwalla</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/cahal-agarwalla" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="social-icon"/>
            </a>
            <a href="https://github.com/CaHHaL" target="_blank" rel="noopener noreferrer">
              <img src="/github.png" alt="GitHub" className="social-icon"/>
            </a>
            <a href="https://x.com/CahalAgarwalla" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.png" alt="X" className="social-icon"/>
            </a>
          </div>
        </div>

        <div className="dev-card">
          <img src="/dev2.jpg" alt="Developer 2" className="dev-image"/>
          <h3>CahalAgarwalla</h3>
          <p>Security Expert</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/janesmith" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="social-icon"/>
            </a>
            <a href="https://github.com/janesmith" target="_blank" rel="noopener noreferrer">
              <img src="/github.png" alt="GitHub" className="social-icon"/>
            </a>
            <a href="https://twitter.com/janesmith" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.png" alt="X" className="social-icon"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [image, setImage] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
    setErrorMessage("");
  };

  // Step 1: Verify Password
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setErrorMessage("Please enter both username and password");
        return;
      }
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (res.data.success) {
        setQrCode(res.data.qr);
        setStep(2);
        setErrorMessage("");
      } else {
        setErrorMessage(res.data.message || "Invalid username or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(
        err.response?.data?.message || 
        "Error connecting to server. Please try again later."
      );
    }
  };

  // Step 2: Upload Face Image
  const handleCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Convert base64 image to blob
      const base64Data = imageSrc.split(',')[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
      
      const formData = new FormData();
      formData.append('image', blob, 'webcam.jpg');
      formData.append('username', username);

      try {
        const res = await axios.post("http://localhost:5000/face-auth", formData);
        if (res.data.success) {
          setStep(3);
          setErrorMessage("");
          setShowWebcam(false);
        } else {
          setErrorMessage(res.data.message || "Face verification failed! Please try again.");
        }
      } catch (err) {
        setErrorMessage(
          err.response?.data?.message || 
          "Error processing face verification. Please try again."
        );
      }
    }
  };

  // Step 3: Verify OTP
  const handleOtpVerify = async () => {
    try {
      if (!otp) {
        setErrorMessage("Please enter the OTP code");
        return;
      }
      const res = await axios.post("http://localhost:5000/verify-otp", {
        username,
        otp,
      });
      if (res.data.success) {
        setStep(4);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid OTP code! Please check and try again.");
      }
    } catch (err) {
      setErrorMessage("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className={`container ${showDashboard ? 'dashboard-active' : ''}`}>
      {!showDashboard ? (
        <>
          <h2>Secure Authentication System</h2>

          {errorMessage && (
            <div className="error-message">
              ⚠️ {errorMessage}
            </div>
          )}

          {showSignup ? (
            <Signup onBackToLogin={() => setShowSignup(false)} />
          ) : (
            <>
              {step === 1 && (
                <>
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button onClick={handleLogin}>Login</button>
                  <p className="auth-link">
                    Don't have an account?{" "}
                    <span onClick={() => setShowSignup(true)} className="link-text">
                      Sign up here
                    </span>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h3>Step 2: Face Verification</h3>
                  <div className="webcam-container">
                    {showWebcam ? (
                      <>
                        <Webcam
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          mirrored={true}
                          className="webcam"
                        />
                        <div className="webcam-buttons">
                          <button onClick={handleCapture}>Capture & Verify</button>
                          <button onClick={() => setShowWebcam(false)} className="cancel-btn">
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <button onClick={() => setShowWebcam(true)}>
                        Start Camera
                      </button>
                    )}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3>Step 3: Enter OTP</h3>
                  <QRCodeCanvas value={qrCode} />
                  <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                  />
                  <button onClick={handleOtpVerify}>Verify OTP</button>
                </>
              )}

              {step === 4 && (
                <div className="success-container">
                  <h2>✅ Authentication Successful</h2>
                  <p>Welcome, {username}! Your authentication is complete and secure.</p>
                  <button className="dashboard-btn" onClick={() => setShowDashboard(true)}>
                    Go to Dashboard
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Dashboard username={username} />
      )}
    </div>
  );
}
