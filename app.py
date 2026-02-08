from flask import Flask
from routes.sessions import sessions_bp
from routes.config import config_bp

app = Flask(__name__)
app.register_blueprint(sessions_bp)
app.register_blueprint(config_bp)