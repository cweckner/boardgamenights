from flask import Flask
from routes.sessions import sessions_bp


# Skapa Flask-app
app = Flask(__name__)
app.register_blueprint(sessions_bp)
