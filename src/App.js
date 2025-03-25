// // import React, { useState } from "react";
// // import axios from "axios";
// // import { QRCodeCanvas } from "qrcode.react";
// // import "./styles.css";

// // export default function App() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [image, setImage] = useState(null);
// //   const [qrCode, setQrCode] = useState("");
// //   const [step, setStep] = useState(1);

// //   // Handle Image Upload
// //   const handleImageUpload = (event) => {
// //     setImage(event.target.files[0]);
// //   };

// //   // Step 1: Verify Password
// //   const handleLogin = async () => {
// //     try {
// //       const res = await axios.post("http://localhost:5000/login", {
// //         username,
// //         password,
// //       });
// //       if (res.data.success) {
// //         setQrCode(res.data.qr);
// //         setStep(2);
// //       } else {
// //         alert("Invalid username or password!");
// //       }
// //     } catch (err) {
// //       alert("Error logging in!");
// //     }
// //   };

// //   // Step 2: Upload Face Image
// //   const handleFaceVerification = async () => {
// //     if (!image) {
// //       alert("Please upload a face image.");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append("image", image);
// //     formData.append("username", username);

// //     try {
// //       const res = await axios.post("http://localhost:5000/face-auth", formData);
// //       if (res.data.success) {
// //         setStep(3);
// //       } else {
// //         alert("Face verification failed!");
// //       }
// //     } catch (err) {
// //       alert("Error in face verification!");
// //     }
// //   };

// //   // Step 3: Verify OTP
// //   const handleOtpVerify = async () => {
// //     try {
// //       const res = await axios.post("http://localhost:5000/verify-otp", {
// //         username,
// //         otp,
// //       });
// //       if (res.data.success) {
// //         setStep(4); // Move to success page
// //       } else {
// //         alert("Invalid OTP!");
// //       }
// //     } catch (err) {
// //       alert("Error verifying OTP!");
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Secure Authentication System</h2>

// //       {step === 1 && (
// //         <>
// //           <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
// //           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //           <button onClick={handleLogin}>Login</button>
// //         </>
// //       )}

// //       {step === 2 && (
// //         <>
// //           <h3>Step 2: Face Verification</h3>
// //           <input type="file" accept="image/*" onChange={handleImageUpload} />
// //           <button onClick={handleFaceVerification}>Upload & Verify</button>
// //         </>
// //       )}

// //       {step === 3 && (
// //         <>
// //           <h3>Step 3: Enter OTP</h3>
// //           <QRCodeCanvas value={qrCode} />
// //           <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
// //           <button onClick={handleOtpVerify}>Verify OTP</button>
// //         </>
// //       )}

// //       {step === 4 && (
// //         <div className="success-container">
// //           <h2>✅ Authentication Successful</h2>
// //           <p>Welcome, {username}! Your authentication is complete and secure.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import "./styles.css";

// export default function App() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [image, setImage] = useState(null);
//   const [qrCode, setQrCode] = useState("");
//   const [step, setStep] = useState(1);
//   const [authStatus, setAuthStatus] = useState(null); // Track authentication status

//   // Handle Image Upload
//   const handleImageUpload = (event) => {
//     setImage(event.target.files[0]);
//   };

//   // Step 1: Verify Password
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         username,
//         password,
//       });
//       if (res.data.success) {
//         setQrCode(res.data.qr);
//         setStep(2);
//       } else {
//         alert("Invalid username or password!");
//       }
//     } catch (err) {
//       alert("Error logging in!");
//     }
//   };

//   // Step 2: Upload Face Image
//   const handleFaceVerification = async () => {
//     if (!image) {
//       alert("Please upload a face image.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("username", username);

//     try {
//       const res = await axios.post("http://localhost:5000/face-auth", formData);
//       if (res.data.success) {
//         setStep(3);
//       } else {
//         alert("Face verification failed!");
//       }
//     } catch (err) {
//       alert("Error in face verification!");
//     }
//   };

//   // Step 3: Verify OTP
//   const handleOtpVerify = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/verify-otp", {
//         username,
//         otp,
//       });
//       if (res.data.success) {
//         setAuthStatus("success"); // Set success status
//         setStep(4);
//       } else {
//         setAuthStatus("failed"); // Set failed status
//         setStep(4);
//       }
//     } catch (err) {
//       alert("Error verifying OTP!");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Secure Authentication System</h2>

//       {step === 1 && (
//         <>
//           <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button onClick={handleLogin}>Login</button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <h3>Step 2: Face Verification</h3>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           <button onClick={handleFaceVerification}>Upload & Verify</button>
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <h3>Step 3: Enter OTP</h3>
//           <QRCodeCanvas value={qrCode} />
//           <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
//           <button onClick={handleOtpVerify}>Verify OTP</button>
//         </>
//       )}

//       {step === 4 && authStatus === "success" && (
//         <div className="success-container">
//           <h2>✅ Authentication Successful</h2>
//           <p>Welcome, {username}! Your authentication is complete and secure.</p>
//         </div>
//       )}

//       {step === 4 && authStatus === "failed" && (
//         <div className="failed-container">
//           <h2>❌ Authentication Failed</h2>
//           <p>Sorry, {username}. Your OTP verification was unsuccessful. Please try again.</p>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "./styles.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [image, setImage] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("Invalid username or password! Please try again.");
      }
    } catch (err) {
      setErrorMessage("Error connecting to server. Please try again later.");
    }
  };

  // Step 2: Upload Face Image
  const handleFaceVerification = async () => {
    if (!image) {
      setErrorMessage("Please upload a face image to continue.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);

    try {
      const res = await axios.post("http://localhost:5000/face-auth", formData);
      if (res.data.success) {
        setStep(3);
        setErrorMessage("");
      } else {
        setErrorMessage("Face verification failed! Please try again with a clearer image.");
      }
    } catch (err) {
      setErrorMessage("Error processing face verification. Please try again.");
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
    <div className="container">
      <h2>Secure Authentication Module for OS</h2>

      {errorMessage && (
        <div className="error-message">
          ⚠️ {errorMessage}
        </div>
      )}

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
        </>
      )}

      {step === 2 && (
        <>
          <h3>Step 2: Face Verification</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleFaceVerification}>Upload & Verify</button>
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
        </div>
      )}
    </div>
  );
}
