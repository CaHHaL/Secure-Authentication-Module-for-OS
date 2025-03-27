from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import json
import os
import cv2
import numpy as np
import random
from datetime import datetime, timedelta
import pyotp
import qrcode
import base64
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Generate a random TOTP secret key
TOTP_SECRET = pyotp.random_base32()

# Directory to store face images
FACE_STORAGE_DIR = 'face_storage'

# Create directory if it doesn't exist
if not os.path.exists(FACE_STORAGE_DIR):
    os.makedirs(FACE_STORAGE_DIR)

# File to store user credentials
USERS_FILE = 'users.json'

# Add this dictionary to store active QR codes
active_qr_codes = {}

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

# Load OpenCV's pre-trained face detection classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No data received'}), 400
            
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400

        users = load_users()
        
        if username in users:
            return jsonify({'success': False, 'message': 'Username already exists'}), 409

        # Hash the password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        # Store user with hashed password
        users[username] = {
            'password': hashed_password.decode('utf-8'),
            'salt': salt.decode('utf-8')
        }
        
        save_users(users)
        return jsonify({'success': True, 'message': 'User registered successfully'}), 201
        
    except Exception as e:
        print(f"Error in signup: {str(e)}")
        return jsonify({'success': False, 'message': f'Server error: {str(e)}'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'})

        users = load_users()
        
        if username not in users:
            return jsonify({'success': False, 'message': 'Invalid username or password'})

        user = users[username]
        stored_password = user['password'].encode('utf-8')

        # Verify password
        if bcrypt.checkpw(password.encode('utf-8'), stored_password):
            # Generate TOTP URI for QR code
            totp = pyotp.TOTP(TOTP_SECRET)
            provisioning_uri = totp.provisioning_uri(username, issuer_name="Secure Auth System")
            
            return jsonify({
                'success': True, 
                'message': 'Login successful',
                'qr': provisioning_uri
            })
        
        return jsonify({'success': False, 'message': 'Invalid username or password'})
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'success': False, 'message': 'Error during login'}), 500

@app.route('/face-auth', methods=['POST'])
def face_auth():
    try:
        if 'image' not in request.files:
            return jsonify({"success": False, "message": "No image file provided"})

        username = request.form.get('username')
        if not username:
            return jsonify({"success": False, "message": "Username not provided"})

        file = request.files['image']
        
        # Read and process the uploaded image
        img_array = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces in the image
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )
        
        if len(faces) == 0:
            return jsonify({"success": False, "message": "No face detected in the image"})
        
        if len(faces) > 1:
            return jsonify({"success": False, "message": "Multiple faces detected. Please use an image with only your face"})
        
        # Get the face region
        (x, y, w, h) = faces[0]
        face_img = img[y:y+h, x:x+w]
        
        # Path for storing the face image
        face_path = os.path.join(FACE_STORAGE_DIR, f"{username}_face.jpg")
        
        # If this is the first time user is uploading a face, save it as reference
        if not os.path.exists(face_path):
            cv2.imwrite(face_path, face_img)
            return jsonify({"success": True, "message": "Face registered successfully"})
        
        # For subsequent verifications, we'll just verify that a face was detected
        return jsonify({"success": True, "message": "Face verification successful"})

    except Exception as e:
        print(f"Error in face verification: {str(e)}")
        return jsonify({"success": False, "message": "Error processing face verification"})

@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    otp = data["otp"]
    totp = pyotp.TOTP(TOTP_SECRET)
    
    if totp.verify(otp):
        return jsonify({"success": True})
    
    return jsonify({"success": False})

if __name__ == '__main__':
    app.run(debug=True)