import React from 'react'
import { useEffect, useState } from "react";
import Image from 'react-bootstrap/Image';
import "./Profile.css"
import config from '../../config';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(`${config.baseUrl}/user/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
          console.log(user)
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    }

    getUserInfo();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  if (!user) {
    return <p className="loading-message">Loading user information...</p>;
  }

  
  return (
    <>
      <div className="content-sidebar">
          <div className="col">
            <div className="image-container">
              <Image src="https://img.icons8.com/color/256/null/user-male-circle--v1.png" roundedCircle />
            </div>
            <p className="username">{user.username}</p>

          <div className="profile-detail">
                <label htmlFor="username" className="block text-lg font-primary">
                  Full Name
                </label>
                <p>{user.first_name} {user.last_name}</p>
          </div>
          
          <div className="profile-detail">
            <label htmlFor="email" className="block text-lg font-primary">
              Email
            </label>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="col">
        <div className="form-container">
      <h1>Set Your Travel Preferences</h1>
      <form>
        <div className="form-group">
          <label htmlFor="favourite-foods">My Favorite Foods:</label>
          <textarea
            id="favourite-foods"
            name="favouriteFoods"
            rows="4"
            cols="100"
            placeholder="Tell us about your favorite foods..."
            readOnly={!editMode}
            style={{ opacity: editMode ? 1 : 0.6, cursor: editMode ? 'auto' : 'default' }}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="hobbies-interests">My Hobbies/Interests:</label>
          <textarea
            id="hobbies-interests"
            name="hobbiesInterests"
            rows="4"
            cols="100"
            placeholder="Share your hobbies and interests..."
            readOnly={!editMode}
            style={{ opacity: editMode ? 1 : 0.6, cursor: editMode ? 'auto' : 'default'}}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="personal-goals">Other:</label>
          <textarea
            id="personal-goals"
            name="personalGoals"
            rows="4"
            cols="100"
            placeholder="Tell us about any other requirements..."
            readOnly={!editMode}
            style={{ opacity: editMode ? 1 : 0.6, cursor: editMode ? 'auto' : 'default' }}
          ></textarea>
        </div>
        <button className={editMode ? 'save-button' : 'edit-button'} type="button" onClick={editMode ? handleSaveClick : handleEditClick}>
                {editMode ? 'Save' : <FontAwesomeIcon icon={faEdit} style={{ color: "#4682A9" }} />}
              </button>
      </form>
    </div>
        </div>
      </div>
    </>
  );
}
