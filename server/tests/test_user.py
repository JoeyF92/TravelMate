from application import db
from unittest import mock
from flask import g
from application.models.models import User

def test_register(client):
    # Prepare test data
    user_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'johndoe@example.com',
        'username': 'johndoe',
        'password': 'password'
    }

    # Make a request to the endpoint
    response = client.post('/user/register', json=user_data)
    assert response.status_code == 201

    # Check if the user is registered in the database
    registered_user = User.query.filter_by(username=user_data['username']).first()
    assert registered_user is not None

    # Check if the user data matches the expected data
    assert registered_user.first_name == user_data['first_name']
    assert registered_user.last_name == user_data['last_name']
    assert registered_user.email == user_data['email']
    assert registered_user.username == user_data['username']

    # Clean up
    db.session.delete(registered_user)
    db.session.commit()


def test_get_all_users(client):
 response = client.get('/user/users')
 assert response.status_code == 200

def test_get_user_by_id(client):
 response = client.get('/user/2')
 assert response.status_code == 200

def test_get_by_username(client):
    # Prepare the test data
    user_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'johndoe@example.com',
        'username': 'johndoe',
        'password': 'password',
        'profile_pic': ''
    }
    
    with client.application.app_context():
        # Create a new user in the test database
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()

        # Make a request to the endpoint
        response = client.get('/user/johndoe')
        assert response.status_code == 200

        # Check the response data

        # Clean up
        db.session.delete(user)
        db.session.commit()

def test_update_user(client):

    user_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'johndoe@example.com',
        'username': 'johndoe',
        'password': 'password',
        'profile_pic': ''
    }
    user = User(**user_data)
    db.session.add(user)
    db.session.commit()

    updated_data = {
        'first_name': 'Updated',
        'last_name': 'User',
        'email': 'updated@example.com',
        'username': 'updated_username',
        'password': 'new_password'
    }

   
    response = client.post(f'/user/{user.user_id}', json=updated_data)
    
   
    assert response.status_code == 200
    assert response.json == {'message': 'User updated!'}

    
    updated_user = User.query.get(user.user_id)

    
    assert updated_user.first_name == updated_data['first_name']
    assert updated_user.last_name == updated_data['last_name']
    assert updated_user.email == updated_data['email']
    assert updated_user.username == updated_data['username']
    
    db.session.delete(updated_user)
    db.session.commit()




