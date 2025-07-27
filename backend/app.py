from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth, firestore
from match import match_bp
from firebase_config import db  # just import, no initialize_app here


# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.register_blueprint(match_bp)

@app.route("/")
def home():
    return "✅ Flask Backend Connected to Firebase"

@app.route("/api/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        print("📥 Received signup data:", data)

        # Check for required fields
        required_fields = ["email", "password", "firstName", "lastName", "college", "year", "department", "skillsToTeach", "skillsToLearn"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Create user in Firebase Authentication
        user = auth.create_user(
            email=data["email"],
            password=data["password"]
        )

        # Store full user profile in Firestore
        user_doc = {
            "uid": user.uid,
            "email": data["email"],
            "firstName": data.get("firstName"),
            "lastName": data.get("lastName"),
            "college": data.get("college"),
            "year": data.get("year"),
            "department": data.get("department"),
            "skillsToTeach": data.get("skillsToTeach"),
            "skillsToLearn": data.get("skillsToLearn"),
            "availability": data.get("availability", "not specified"),
            "created_at": firestore.SERVER_TIMESTAMP
        }

        db.collection("users").document(user.uid).set(user_doc)

        print("✅ User created successfully:", user.uid)
        return jsonify({"uid": user.uid, "message": "User created successfully"}), 200

    except Exception as e:
        print("❌ Signup error:", str(e))
        return jsonify({"error": str(e)}), 400

@app.route("/api/users", methods=["GET"])
def get_all_users():
    try:
        users = db.collection("users").stream()
        all_users = []
        for doc in users:
            user_data = doc.to_dict()
            user_data["uid"] = doc.id
            all_users.append(user_data)
        return jsonify(all_users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/user/<uid>", methods=["GET"])
def get_user(uid):
    try:
        doc = db.collection("users").document(uid).get()
        print(f"📥 Fetching user with UID: {uid}")

        if doc.exists:
            print("✅ User found!")
            return jsonify(doc.to_dict()), 200
            
        else:
            print("❌ User not found!")
            return jsonify({"error": "User not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/api/match/<uid>", methods=["GET"])
def match_skills(uid):
    try:
        # Fetch current user
        current_user_doc = db.collection("users").document(uid).get()
        if not current_user_doc.exists:
            print(f"❌ User not found for UID: {uid}")
            return jsonify({"error": "User not found"}), 404

        current_user = current_user_doc.to_dict()

        # Normalize skills (handle both list or comma-separated strings)
        skills_to_learn = current_user.get("skillsToLearn", [])
        skills_to_teach = current_user.get("skillsToTeach", [])

        if isinstance(skills_to_learn, str):
            skills_to_learn = [s.strip().lower() for s in skills_to_learn.split(",") if s.strip()]
        if isinstance(skills_to_teach, str):
            skills_to_teach = [s.strip().lower() for s in skills_to_teach.split(",") if s.strip()]

        print("Current user's skillsToLearn:", skills_to_learn)
        print("Current user's skillsToTeach:", skills_to_teach)

        all_users = db.collection("users").stream()
        matched_users = []

        for doc in all_users:
            if doc.id == uid:
                continue  # skip self

            user = doc.to_dict()

            # Normalize other users' skills
            other_teach = user.get("skillsToTeach", [])
            other_learn = user.get("skillsToLearn", [])

            if isinstance(other_teach, str):
                other_teach = [s.strip().lower() for s in other_teach.split(",") if s.strip()]
            if isinstance(other_learn, str):
                other_learn = [s.strip().lower() for s in other_learn.split(",") if s.strip()]

            print(f"Checking user {doc.id}")
            print("skillsToTeach:", other_teach)
            print("skillsToLearn:", other_learn)

            if any(skill in skills_to_learn for skill in other_teach) and any(skill in skills_to_teach for skill in other_learn):
                matched_users.append({
                    "uid": doc.id,
                    "name": f"{user.get('firstName', '')} {user.get('lastName', '')}".strip(),
                    "skillsToTeach": other_teach,
                    "skillsToLearn": other_learn,
                    "college": user.get("college", ""),
                    "year": user.get("year", ""),
                    "department": user.get("department", "")
                })

        print(f"✅ Found {len(matched_users)} matches for UID: {uid}")
        return jsonify({"matches": matched_users}), 200

    except Exception as e:
        print("❌ Match skills error:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/api/swipe", methods=["POST"])
def swipe():
    try:
        data = request.json
        swiper_id = data.get("swiper_id")
        swiped_id = data.get("swiped_id")
        action = data.get("action")  # "like" or "pass"

        if not all([swiper_id, swiped_id, action]):
            return jsonify({"error": "Missing required fields"}), 400

        # Fetch swiper's swipes
        swipe_ref = db.collection("swipes").document(swiper_id)
        swipe_doc = swipe_ref.get()
        swipes = swipe_doc.to_dict() if swipe_doc.exists else {"liked": [], "passed": []}

        # Update swipe action
        if action == "like" and swiped_id not in swipes["liked"]:
            swipes["liked"].append(swiped_id)
        elif action == "pass" and swiped_id not in swipes["passed"]:
            swipes["passed"].append(swiped_id)

        swipe_ref.set(swipes)

        # Check for mutual match
        other_swipe_doc = db.collection("swipes").document(swiped_id).get()
        is_match = False

        if other_swipe_doc.exists:
            other_swipes = other_swipe_doc.to_dict()
            if swiper_id in other_swipes.get("liked", []):
                is_match = True

                # ✅ Save to matches collection
                match_id = f"{min(swiper_id, swiped_id)}_{max(swiper_id, swiped_id)}"
                match_ref = db.collection("matches").document(match_id)
                match_ref.set({
                    "users": [swiper_id, swiped_id],
                    "timestamp": firestore.SERVER_TIMESTAMP,
                    "status": "active"
                })

        return jsonify({
            "message": "Swipe recorded",
            "match": is_match
        }), 200

    except Exception as e:
        print("❌ Swipe error:", str(e))
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
