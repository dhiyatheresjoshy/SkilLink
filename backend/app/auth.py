from firebase_admin import firestore

# Assuming login credentials were verified
def get_user_data(email):
    users_ref = db.collection('users')
    query = users_ref.where('email', '==', email).stream()

    for doc in query:
        return doc.to_dict()
    return None
