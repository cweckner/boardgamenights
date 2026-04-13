# backend/routes/sessions.py
from flask import Blueprint, request, jsonify
from functools import wraps

sessions_bp = Blueprint('sessions', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == 'OPTIONS':
            return jsonify({}), 204  # Svara på preflight

        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "Authorization-header saknas"}), 401

        try:
            # Här bör du verifiera token med Firebase Admin SDK
            # token = auth_header.split()[1]
            # decoded_token = auth.verify_id_token(token)
            # request.user = decoded_token
            pass
        except Exception as e:
            print(f"Token-fel: {e}")
            return jsonify({"error": "Ogiltig token"}), 401

        return f(*args, **kwargs)
    return decorated

@sessions_bp.route('/', methods=['GET', 'OPTIONS'])
@token_required
def get_sessions():
    if request.method == 'OPTIONS':
        return jsonify({}), 204  # Svara på preflight

    # Här bör du returnera sessions-data
    return jsonify([
        {"id": 1, "title": "Spelkväll 1", "deadline": "2026-05-01"},
        {"id": 2, "title": "Spelkväll 2", "deadline": "2026-05-15"}
    ])