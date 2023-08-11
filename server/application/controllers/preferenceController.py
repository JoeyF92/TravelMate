from application import db, app
from application.models import Preference
from flask import request, jsonify, render_template, redirect, url_for

def create_preference(id):
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
    preference = Preference.query.filter_by(user_id = id).first().__dict__
    preference.pop("_sa_instance_state", None)
    return preference, 200

def update_preference(id):
    data = request.get_json()
    preference = db.session.get(Preference, id)
    preference.foods = data.foods or preference.foods
    preference.hobbies = data.hobbies or preference.hobbies
    preference.other = data.other or preference.other
    db.session.commit()
    return jsonify({'message': 'preference details updated!'}), 200

def destroy_preference(id):
    preference = db.session.get(Preference, id)
    db.session.delete(preference)
    db.session.commit()
    return jsonify({'message': 'preference deleted!'}), 204
