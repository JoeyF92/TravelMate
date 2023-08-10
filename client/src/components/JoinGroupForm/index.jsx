import React, { useState } from "react";
import "./styles.css"; // Import your CSS file for styling

export default function JoinGroupForm() {
  const [joinCode, setJoinCode] = useState("");

  const handleJoinCodeChange = (event) => {
    setJoinCode(event.target.value);
  };

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    console.log("Join code submitted:", joinCode);
    // Add your logic here to handle the join code submission
  };

  return (
    <div className="join-form-container">
      <form className="group-form" onSubmit={handleJoinSubmit}>
        <div className="form-group">
          <label htmlFor="joinCode">Join a group:</label>
          <input
            type="text"
            id="joinCode"
            name="joinCode"
            placeholder="Enter Group Code"
            value={joinCode}
            onChange={handleJoinCodeChange}
          />
        </div>
        <button className="join-button" type="submit">
          Join
        </button>
      </form>
    </div>
  );
}
