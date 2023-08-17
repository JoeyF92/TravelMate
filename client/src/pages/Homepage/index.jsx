import React, {useEffect, useState} from 'react'
import "./Homepage.css"
import image1 from "../../assets/feature_1.png";
import image2 from "../../assets/feature_2.png";
import image3 from "../../assets/feature_3.png";
import config from '../../config';
import axios from "axios";

export default function Homepage() {
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
    <div className="home-page">
      <div className="feature">
        <div className="feature-text">
          <h2>Hi {user.first_name}, ready to <span className="blue">Plan</span> your next trip?</h2>
          <p>Embark on your travel dreams with our cutting-edge AI technology. Our AI-powered itinerary generator takes your preferences and creates personalized travel plans. Whether you're seeking cultural experiences, outdoor adventures, or relaxation, our smart system crafts the perfect itinerary, ensuring each trip is a unique adventure.</p>
        </div>
        <div className="feature-image">
          <img src={image1} alt="Feature 1"/>
        </div>
      </div>
      <div className="feature-two">
        <div className="feature-image">
          <img src={image2} alt="Feature 2" style={{height: 600}}/>
        </div>
        <div className="feature-text">
          <h2>Capture & Share <span className="blue">Memories</span> with Albums</h2>
          <p>Relive your travel moments with our innovative album creation feature. Capture every memory by curating digital albums filled with photos and notes. The magic doesn't stop there – invite friends and family to your album using a unique share code. Now everyone can contribute, turning your album into a collaborative treasure trove of memories.</p>
        </div>
      </div>
      <div className="feature">
        <div className="feature-text">
          <h2>Stay <span className="blue">Organised</span> with a Packing List</h2>
          <p>Maximize your travel efficiency with our intuitive packing list feature. Simplify your preparations by creating detailed lists for your upcoming adventures. Ticking off items as you pack ensures nothing gets left behind. Say goodbye to last-minute packing stress and embrace the confidence of being fully prepared for your journey.</p>
        </div>
        <div className="feature-image">
          <img src={image3} alt="Feature 3"/>
        </div>
      </div>
    </div>
  )
}
