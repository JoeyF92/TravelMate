from application import db, app
from application.models import Itinerary
from flask import request, jsonify, render_template, redirect, url_for
import requests

OPENAI_API_KEY = app.config['OPENAI_API_KEY']

def generate_itinerary_with_chatgpt(user_input):
    system_message = "You are a helpful travel itinerary assistant."
    user_message = user_input
    response = call_chatgpt_api(system_message, user_message)
    print("response", response)
    return response['choices'][0]['message']['content'].strip()

def call_chatgpt_api(system_message, user_message):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'OpenAI-Organization': 'org-eUcRyyF7rRbARIgCJEOMFube'
    }
    data = {
        'messages': [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': user_message}
        ],
        'model': 'gpt-3.5-turbo' ,
        'top_p':0.9
    }
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    return response.json()

def save_itinerary():
    data= request.json
    itinerary_data = data.get('itinerary')
    id= data.get('album_id')
    itinerary = Itinerary(itinerary=itinerary_data, album_id=id)
    db.session.add(itinerary)
    db.session.commit()
    return jsonify({"message": "Itinerary saved successfully"}), 200

def delete_itinerary(album_id):
    itinerary = Itinerary.query.filter_by(album_id=album_id).first()

    db.session.delete(itinerary)
    db.session.commit()
    return jsonify({"message": "Itinerary deleted successfully"})

def get_itinerary(album_id):
    itinerary = Itinerary.query.filter_by(album_id = album_id).first()
    if itinerary is None:
        return jsonify({'message': 'itinerary not found'}), 404

    itinerary_data = {
        'itinerary_id': itinerary.itinerary_id,
        'itinerary': itinerary.itinerary,
    }

    return jsonify(itinerary_data), 200
