from flask import Flask
from routes.sessions import sessions_bp

app = Flask(__name__)
app.register_blueprint(sessions_bp)