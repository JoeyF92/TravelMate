from application import db
# from application.models import Preference
from flask import request, jsonify

def create_preference(id):
    from application.models.models import Preference
    data = request.get_json()
    foods = data.get("foods")
    hobbies = data.get("hobbies")
    other = data.get("other")
    user_id = id
    if not user_id:
        return jsonify({"error": "Missing parameters"}), 400
    preference = Preference(foods = foods, hobbies = hobbies, other = other, user_id = user_id)
    db.session.add(preference)
    db.session.commit()
    return jsonify({"Message": "Successfully added preference"}), 201

def index_preference_by_user_id(id):
    from application.models.models import Preference
    preference = Preference.query.filter_by(user_id = id).first().__dict__
    preference.pop("_sa_instance_state", None)
    return preference, 200

def update_preference(id):
    from application.models.models import Preference
    data = request.get_json()
    preference = db.session.get(Preference, id)
    
    if preference is None:
        return jsonify({'error': 'Preference not found'}), 404

    preference.foods = data.get("foods", preference.foods)
    preference.hobbies = data.get("hobbies", preference.hobbies)
    preference.other = data.get("other", preference.other)
    db.session.commit()
    return jsonify({'message': 'preference details updated!'}), 200

def destroy_preference(id):
    from application.models.models import Preference
    preference = db.session.get(Preference, id)
    db.session.delete(preference)
    db.session.commit()
    return jsonify({'message': 'preference deleted!'}), 204

def index_preference_by_album(album_id):
    from .albumController import index_album_by_id

    album, status_code = index_album_by_id(album_id)
    foods = []
    hobbies = []
    other = []

    members = album["members"].split(',')
    for member in members:
        preference, status = index_preference_by_user_id(member)

        if preference.get("foods"):
            foods.extend(preference.get("foods","").split(","))
        if preference.get("hobbies"):
            hobbies.extend(preference.get("hobbies","").split(","))
        if preference.get("other"):
            other.extend(preference.get("other","").split(","))
    
    all_pref = {
        "foods": ", ".join(foods),
        "hobbies": ", ".join(hobbies),
        "other": ", ".join(other)
    }

    return all_pref, 200
