import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def init_firebase():
    if os.getenv("FIREBASE_CREDENTIALS_JSON"):
        # På Render: Läs från miljövariabel (JSON-sträng)
        cred_json = json.loads(os.getenv("FIREBASE_CREDENTIALS_JSON"))
        cred = credentials.Certificate(cred_json)
    else:
        # Lokalt: Läs från .env och fil
        from dotenv import load_dotenv
        load_dotenv()
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
        if not cred_path:
            raise ValueError("FIREBASE_CREDENTIALS_PATH saknas i .env!")
        with open(cred_path) as f:
            cred = credentials.Certificate(json.load(f))

    # Initiera Firebase (endast en gång)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    return firestore.client()

# Initiera och exportera db
db = init_firebase()
