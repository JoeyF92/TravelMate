from application import db
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
