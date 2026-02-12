# routes/sessions.py
from flask import Blueprint, request, jsonify
from config.firebase import db
from datetime import datetime
import firebase_admin

sessions_bp = Blueprint('sessions', __name__)


@sessions_bp.route('/sessions')
def get_sessions():
    # Hämta och validera JWT-token
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Authorization header missing"}), 401

    id_token = auth_header.split('Bearer ')[1]
    try:
        decoded_token = firebase_admin.auth.verify_id_token(id_token)
        uid = decoded_token['uid']

        # Hämta spelkvällar från Firestore
        sessions_ref = db.collection('sessions')
        sessions = [doc.to_dict() for doc in sessions_ref.stream()]

        return jsonify(sessions)
    except Exception as e:
        return jsonify({"error": str(e)}), 401


@sessions_bp.route("/create_session", methods=["POST"])
def create_session():
    data = request.json
    session_data = {
        "creator": data["creator"],
        "created": datetime.now().isoformat(),
        "title": data.get("title", "Spelkväll"),
        "description": data.get("description", ""),
        "deadline": data["deadline"],
        "status": "open",
        "times": data["times"],
        "games": data["games"],
        "host": data.get("host", []),
        "comments": [],
    }
    doc_ref = db.collection("sessions").add(session_data)
    return jsonify({"status": "success", "sessionId": doc_ref[1].id})

@sessions_bp.route("/session/<session_id>", methods=["GET"])
def get_session(session_id):
    doc = db.collection("sessions").document(session_id).get()
    if doc.exists:
        return jsonify(doc.to_dict())
    else:
        return jsonify({"status": "error", "message": "Session not found"}), 404

@sessions_bp.route("/session/<session_id>/vote", methods=["POST"])
def vote(session_id):
    data = request.json
    session_ref = db.collection("sessions").document(session_id)

    # Uppdatera tidsomröstning
    for time_id in data["timeVotes"]:
        session_ref.update({
            f"timeOptions": firebase_admin.firestore.ArrayUnion({
                "id": time_id,
                "votes": firebase_admin.firestore.ArrayUnion(data["userId"])
            })
        })

    # Uppdatera spelomröstning
    for game_id in data["gameUpvotes"]:
        session_ref.update({
            f"gameOptions": firebase_admin.firestore.ArrayUnion({
                "id": game_id,
                "upvotes": firebase_admin.firestore.ArrayUnion(data["userId"])
            })
        })

    return jsonify({"status": "success"})
