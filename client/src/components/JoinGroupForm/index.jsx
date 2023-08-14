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
