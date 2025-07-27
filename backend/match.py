# backend/match.py
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from firebase_config import db

match_bp = Blueprint("match", __name__)

@match_bp.route("/api/match", methods=["POST"])
def create_match():
    data = request.get_json()
    user1 = data.get("user1")
    user2 = data.get("user2")

    if not user1 or not user2:
        return jsonify({"error": "Both users must be provided"}), 400

    match_data = {
        "user1": user1,
        "user2": user2,
        "timestamp": firestore.SERVER_TIMESTAMP
    }

    try:
        match_ref = db.collection("matches").add(match_data)
        return jsonify({"matchId": match_ref[1].id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
