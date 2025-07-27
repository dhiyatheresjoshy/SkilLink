# backend/firebase_config.py
import firebase_admin
from firebase_admin import credentials, firestore

# Only initialize the app if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-adminsdk.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
