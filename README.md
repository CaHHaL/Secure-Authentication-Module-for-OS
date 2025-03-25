# Secure Authentication Module for Operating Systems

## 📌 Project Overview
The **Secure Authentication Module** is designed to enhance OS-level security by integrating **Multi-Factor Authentication (MFA)** and **Face Recognition Authentication**. This module prevents unauthorized access, protects against common vulnerabilities (buffer overflow, trapdoors), and provides a robust authentication mechanism.

## 🚀 Features
✅ **Multi-Factor Authentication (MFA)** – Secure login with username, password, and facial recognition.  
✅ **Face Recognition Authentication** – Capture and verify user identity via webcam or uploaded images.  
✅ **Modern UI** – Aesthetic and responsive login interface built with React & Tailwind CSS.  
✅ **Flask Backend** – Handles authentication, user management, and face verification.  
✅ **Security Measures** – Protects against brute-force attacks and unauthorized access.  

## 🛠️ Technologies Used
### **Frontend (React + Tailwind CSS)**
- React.js (UI Framework)
- Tailwind CSS (Styling)
- Axios (API Requests)

### **Backend (Flask)**
- Flask (Python Web Framework)
- OpenCV & NumPy (Image Processing)
- bcrypt (Password Hashing)
- PyOTP (One-Time Passwords)

### **OS Integration (Linux)**
- Linux PAM (Pluggable Authentication Module)
- libpam-dev (PAM Development Library)

---

## 📂 Project Structure
```
secure-auth-module/
│── backend/             # Flask API (User Authentication, Face Recognition)
│   ├── app.py          # Main Flask Server
│   ├── auth.py         # Authentication Logic
│   ├── face_recog.py   # Face Recognition Processing
│   ├── requirements.txt # Dependencies
│
│── frontend/           # React App (User Interface)
│   ├── src/
│   │   ├── App.js      # Main UI Component
│   │   ├── Dashboard.js # Success Page
│   │   ├── index.js    # React Router
│   │   ├── styles/     # Tailwind CSS
│
│── README.md           # Documentation
```

---

## 🔧 Installation & Setup
### **1️⃣ Install Backend (Flask) Dependencies**
```sh
cd backend
pip install -r requirements.txt
```

### **2️⃣ Install Frontend (React) Dependencies**
```sh
cd frontend
npm install
```

### **3️⃣ Run Backend Server**
```sh
cd backend
python app.py
```

### **4️⃣ Run Frontend (React)**
```sh
cd frontend
npm start
```

---

## 🎯 How to Use
### **1️⃣ Login with Credentials**
- Enter **Username** & **Password**
- Click **Login**

### **2️⃣ Face Authentication**
- Upload a **Face Image** or **Capture via Webcam**
- Click **Authenticate**

### **3️⃣ Access Dashboard**
- On successful authentication, user is redirected to **Dashboard**.

---

## ❓ Troubleshooting
### **Common Issues & Fixes**
🔹 **Error: `ModuleNotFoundError: No module named 'flask'`**  
→ Run: `pip install flask`

🔹 **Error: `npm error could not determine executable to run`**  
→ Delete `node_modules` and `package-lock.json`, then run:  
```sh
rm -rf node_modules package-lock.json
npm install
```

🔹 **Tailwind not working?**  
→ Run: `npx tailwindcss -v` to check version. If missing, reinstall:
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🎯 Future Improvements
- 🔹 **Live Camera Face Recognition** (instead of file upload)
- 🔹 **Dark Mode Support** for better UI experience
- 🔹 **Mobile OTP Authentication**
- 🔹 **More Secure Login Mechanisms (Fingerprint, Voice Recognition)**

🚀 **Enjoy building secure authentication for your OS!** 🔐

