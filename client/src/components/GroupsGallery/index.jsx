import React, { useState, useEffect } from "react";
import { Link, useActionData } from "react-router-dom";
import ImageCarousel from "../ImageCarousel";
import NewGroupForm from "../NewGroupForm";
import JoinGroupForm from "../JoinGroupForm";

//delete when swapped
import mockGroups from "../mocks/data/groups.json";

import "./styles.css";

export default function ShowGallery() {
  const [groups, setGroups] = useState([]);
  const stockGroups = [
    {
      id: 1,
      title: "Group Holiday",
      img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692029925/Final%20Project%20Mocks/pool-party_r7e5tx.jpg",
    },
    {
      id: 2,
      title: "Stag/Hen Party",
      img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692029924/Final%20Project%20Mocks/74175-stag-party-games_xvel7x.jpg",
    },

    {
      id: 3,
      title: "Work Trip",
      img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692029924/Final%20Project%20Mocks/workhol_dptwpk.jpg",
    },
    {
      id: 4,
      title: "Family Adventure",
      img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692029925/Final%20Project%20Mocks/fam-hol_dnk26k.jpg",
    },
  ];

  let user_id = localStorage.user_id;
  //delete this line iab
  // user_id = 1;

  useEffect(() => {
    async function displayGroups() {
      const response = await fetch(
        `http://127.0.0.1:5000/album/user/${user_id}`
      );
      const data = await response.json();
      setGroups(data);
      console.log(data);
    }

    displayGroups();
  }, []);

  return (
    <>
      <ImageCarousel user_id={user_id} />

      <div id="middle">
        <div id="create-group-all">
          <div id="create-group-left">
            <h2>
              {" "}
              <span className="emoji" role="img" aria-label="Plane">
                ✈️
              </span>{" "}
              Begin Your New Adventure{" "}
            </h2>
            <p>
              Experience the joy of collaborative travel planning. Create a
              group and embark on an adventure where everyone's preferences come
              to life.
            </p>
            <h2>
              <span className="emoji" role="img" aria-label="Knife and Fork">
                🍴
              </span>{" "}
              Dine Like Locals
            </h2>
            <p>
              Finding the perfect restaurant has never been easier. Let our AI
              suggest local gems for your group to dine, ensuring every taste
              bud is satisfied.
            </p>
            <h2>
              <span role="img" aria-label="Camera Flash">
                📸
              </span>{" "}
              Capture Every Moment
            </h2>
            <p>
              Cherish the moments that matter. Share photos, videos, and stories
              from your trip within your group, creating a digital memory lane
              you'll all treasure forever.
            </p>

            <h2>
              <span className="emoji" role="img" aria-label="Tick Box">
                ✅
              </span>{" "}
              Your Itinerary Your Way
            </h2>
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
          {groups.length === 0 ? (
            <h3> Plan Your Upcoming Trips + Relive Past Memories: </h3>
          ) : (
            <h3> View Your Upcoming Trips + Relive Past Memories: </h3>
          )}
        </div>
        <div id="all-groups-inner">
          {groups.length === 0
            ? stockGroups.map((group, i) => (
                <div key={i} className="group-link">
                  <img src={group.img} alt={`Group Id:${group.id} Image`} />
                  <div className="group-title">{group.title}</div>
                </div>
              ))
            : groups.map((group, i) => (
                <Link to={`${group.album_id}`} key={i} className="group-link">
                  <img
                    src={group.cover_photo}
                    alt={`Group Id:${group.album_id} Image`}
                  />
                  <div className="group-title">{group.title}</div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
