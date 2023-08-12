import React, {useEffect, useState} from 'react'
import config from '../../config';
import axios from "axios";
import Image from 'react-bootstrap/Image';

export default function UserProfileCard() {
    const userId = localStorage.getItem("user_id"); 
    const [user, setUser] = useState(null);

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

      if (!user) {
        return <p className="loading-message">Loading user information...</p>;
      }    

    return (
        <div className="col">
          <div className="profile-top">
            <div className="image-container">
              <Image src="https://img.icons8.com/color/256/null/user-male-circle--v1.png" roundedCircle />
            </div>
            <p className="username">{user.username}</p>
          </div>

          <div className="profile-detail">
            <label className="block text-lg font-primary">
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
        </div>
    )
}
