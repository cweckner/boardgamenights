import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore


# Ladda miljövariabler
load_dotenv()

# Initiera Firebase Admin
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
firebase_admin.initialize_app(cred)
db = firestore.client()