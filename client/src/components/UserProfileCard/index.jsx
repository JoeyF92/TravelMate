import React, {useEffect, useState} from 'react'
import config from '../../config';
import axios from "axios";
import Image from 'react-bootstrap/Image';

export default function UserProfileCard() {
    const userId = localStorage.getItem("user_id"); 
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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

      useEffect(() => {
        const savedImageData = localStorage.getItem('profile_picture');
        if (savedImageData) {
          setSelectedImage(savedImageData);
        }
      }, []);
    
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          setSelectedImage(reader.result);
          localStorage.setItem('profile_picture', reader.result);
        };
        reader.readAsDataURL(file);
      };
    
      if (!user) {
        return <p className="loading-message">Loading user information...</p>;
      }

    return (
        <div className="col">
          <div className="profile-top d-flex align-items-center flex-column">
          <div className="image-container">
            <Image
              src={
                selectedImage ||
                'https://img.icons8.com/?size=512&id=ABBSjQJK83zf&format=png'
              }
              style={{ width: '200px', height: '200px'}}
              roundedCircle
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="fileInput"
              style={{ display: 'none' }}
            />
          </div>
        <button className="button-picture" onClick={() => document.getElementById('fileInput').click()}>
          Change Picture
        </button>
        <p className="username">{user.username}</p>
      </div>

          <div className="profile-detail">
            <label className="block text-lg font-primary" data-testid="full-name-element">
              Full Name:
            </label>
            <p>{user.first_name} {user.last_name}</p>
          </div>
          
          <div className="profile-detail">
            <label className="block text-lg font-primary">
              Email:
            </label>
            <p>{user.email}</p>
          </div>
          <p>Full</p>
        </div>
    )
}
