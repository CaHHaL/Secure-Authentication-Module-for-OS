from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import pyotp
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Dummy user data
USER_CREDENTIALS = {"admin": bcrypt.hashpw("admin".encode(), bcrypt.gensalt())}
TOTP_SECRET = pyotp.random_base32()

# Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username, password = data["username"], data["password"]
    
    if username in USER_CREDENTIALS and bcrypt.checkpw(password.encode(), USER_CREDENTIALS[username]):
        otp_uri = pyotp.totp.TOTP(TOTP_SECRET).provisioning_uri(username, issuer_name="SecureOSAuth")
        return jsonify({"success": True, "qr": otp_uri})
    
    return jsonify({"success": False})

# Face Authentication Route
@app.route("/face-auth", methods=["POST"])
def face_auth():
    file = request.files["image"]
    np_img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    if img is not None:  # Simulate face match
        return jsonify({"success": True})
    
    return jsonify({"success": False})

# OTP Verification Route
@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    otp = data["otp"]
    totp = pyotp.TOTP(TOTP_SECRET)
    
    if totp.verify(otp):
        return jsonify({"success": True})
    
    return jsonify({"success": False})

if __name__ == "__main__":
    app.run(debug=True)
