import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../ImageCarousel";
import NewGroupForm from "../NewGroupForm";
import JoinGroupForm from "../JoinGroupForm";
//delete when swapped
import mockGroups from "../mocks/data/groups.json";

import "./styles.css";

export default function ShowGallery() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function displayGroups() {
      // add fetch route here
      //   const response = await fetch("");
      //   const data = await response.json();
      setGroups(mockGroups);
      console.log(groups);
    }

    displayGroups();
  }, []);

  return (
    <>
      {/* temp nav bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <ImageCarousel groups={groups} />

      <div id="middle">
        <div id="create-group-all">
          <div id="create-group-left">
            <h2> Begin your new adventure </h2>
            <p>
              Experience the joy of collaborative travel planning. Create a
              group and embark on an adventure where everyone's preferences come
              to life.
            </p>
            <h2> Capture Every Moment </h2>
            <p>
              Cherish the moments that matter. Share photos, videos, and stories
              from your trip within your group, creating a digital memory lane
              you'll all treasure forever.
            </p>
            <h2> Dine Like Locals</h2>
            <p>
              Finding the perfect restaurant has never been easier. Let our AI
              suggest local gems for your group to dine, ensuring every taste
              bud is satisfied.
            </p>
            <h2> Your Itinerary, Your Way:</h2>
            <p>
              Tailor your itinerary to suit everyone's interests. Our AI crafts
              a seamless plan that embraces the diversity of your group's
              preferences.
            </p>
          </div>
          <div id="create-group-right">
            {/* <div id="create-group">
              <h3> Create a new group</h3> */}
            <NewGroupForm />
            <JoinGroupForm />
            {/* </div> */}
            {/* <div id="join-group">
              {" "}
              Join a group
              <JoinGroupForm />
            </div> */}
          </div>
        </div>
      </div>
      <div id="all-groups">
        <div id="all-groups-heading">
          <h3> View upcoming trips, relive past memories: </h3>
        </div>
        <div id="all-groups-inner">
          {groups.map((group) => (
            <Link
              to={`groups/${group.id}`}
              key={group.id}
              className="group-link"
            >
              <img src={group.img} alt={`Group Id:${group.id} Image`} />
              <div className="group-title">{group.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
