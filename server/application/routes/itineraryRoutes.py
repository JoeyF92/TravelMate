from application import app, db
from flask import Blueprint, request, jsonify
from application.controllers.itineraryController import *

itinerary_routes = Blueprint("itinerary_routes", __name__)

@itinerary_routes.route('/generate_itinerary', methods=['POST'])
def generate_itinerary():
    try:
        user_input = request.json.get('user_input')
        response = generate_itinerary_with_chatgpt(user_input)
        return jsonify({"itinerary": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@itinerary_routes.route('/save_itinerary', methods=['POST'])
def save_itinerary_route():
    return save_itinerary()

@itinerary_routes.route('/delete_itinerary/<int:album_id>', methods=['DELETE'])
def delete_itinerary_route(album_id):
    return delete_itinerary(album_id)

@itinerary_routes.route('/<int:album_id>', methods=['GET'])
def get_itinerary_route(album_id):
    return get_itinerary(album_id)
    