import React from 'react'
import { useEffect, useState } from "react";
import config from '../../config';
import axios from "axios";

export default function Profile() {
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

  
  return (
    <div>
      {user ? (
        <div>
          <h1>User Profile</h1>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}
