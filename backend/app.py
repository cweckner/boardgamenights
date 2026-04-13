# backend/app.py
from flask import Flask
from flask_cors import CORS
from routes.sessions import sessions_bp
from routes.config import config_bp

app = Flask(__name__)

# Inaktivera omdirigering av URL:er utan snedstreck
app.url_map.strict_slashes = False

# Tillåt CORS för alla routes (endast flask-cors)
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:5500"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Authorization", "Content-Type"],
    "supports_credentials": True
}})

# Registrera blueprints
app.register_blueprint(config_bp, url_prefix='/config')
app.register_blueprint(sessions_bp, url_prefix='/sessions')