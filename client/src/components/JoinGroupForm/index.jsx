import React, { useState } from "react";
import "./styles.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:5000";
export default function JoinGroupForm() {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");

  const handleJoinCodeChange = (event) => {
    setJoinCode(event.target.value);
  };

  const handleJoinSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("Join code submitted:", joinCode);

      // Get album by share code to extract current members
      let album = await axios.get(`${baseUrl}/album/code/${joinCode}`);
      album = album.data;
      console.log(album);
      const membersArray = album.members.split(",").map(Number);

      // Check if user is already a member of the group
      if (membersArray.includes(parseInt(777))) {
        console.log("You are already a member of that group");
      } else {
        membersArray.push(parseInt(localStorage.user_id));
        album.members = membersArray.join(",");

        // Update the album
        const response = await axios.put(
          `${baseUrl}/album/update/${album.album_id}`,
          {
            album_id: album.album_id,
            title: album.title,
            location: album.location,
            members: album.members,
            start_date: album.start_date,
            end_date: album.end_date,
            description: album.description,
            cover_photo: album.cover_photo,
          }
        );
        console.log("Successfully Joined Group");
        navigate(`${album.album_id}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error, show a message, or perform any necessary actions
    }
  };

  return (
    <div className="join-form-container">
      <form className="join-group-form" onSubmit={handleJoinSubmit}>
        <label className="join-label" htmlFor="joinCode">
          Join an existing group:
        </label>
        <input
          className="join-input-text"
          type="text"
          id="joinCode"
          name="joinCode"
          placeholder="Enter Group Code"
          value={joinCode}
          onChange={handleJoinCodeChange}
        />

        <button className="join-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
