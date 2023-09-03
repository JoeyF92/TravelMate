import React from 'react'
import {useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import image from '../../assets/Logo-globe.png';

const locationAPIKey= 'ad004eba91bf4aa08c9f2c595db5c012';

export default function AiSuggestion(album_id) {

    const [currentLocation, setCurrentLocation] = useState('');
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const [preferences, setPreferences] = useState('')
    const [typingMessage, setTypingMessage] = useState('')
    
    const handleClose = () => setShow(false);

    const handleClick = () => {
        setShow(true)
    }

    function getLocationInfo(latitude, longitude) {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${locationAPIKey}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.status.code === 200) {
              setCurrentLocation(data.results[0].formatted);
              setLocationLoading(false)
            } else {
              console.log("Reverse geolocation request failed.");
            }
          })
          .catch((error) => console.error(error));
      }

      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        var crd = pos.coords;
        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
    
        getLocationInfo(crd.latitude, crd.longitude);
      }
    
      function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    
      const getLocation = (e) => {
        e.preventDefault()
        setLocationLoading(true)
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              if (result.state === "granted") {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "prompt") {
                //If prompt then the user will be asked to give permission
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
              }
            });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      };

      const findFood = async (e) => {
        e.preventDefault()

        try {
          setIsLoading(true);

          const preferencesResponse = await fetch(`http://127.0.0.1:5000/preference/album/${album_id.album_id}`)
          const preferencesData = await preferencesResponse.json()

          const userPreferences = [preferencesData.foods]
    
          const prompt = `I am a software which assists users with their travels. One feature of the app is to suggest places to eat near the user. I want you to suggest 5 places to eat near ${currentLocation} taking into account these user preferences (if any): ${preferences}, ${userPreferences}. Please response in json format with key value pairs, including the restaurant name and a brief description of the restaurant like this: {
            "restaurants": [
            {
            "name": "The Phoenix",
            "description": "A traditional English pub offering a variety of classic pub dishes in a cozy and welcoming atmosphere."
            },
            {
            "name": "Claycutters Arms",
            "description": "A charming countryside inn known for its locally sourced ingredients and hearty British cuisine."
            }. Please don't include anything else in your response, only the restaurant information I am requesting.`
    
          const response = await fetch('http://127.0.0.1:5000/itinerary/generate_itinerary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: prompt }),
          });
    
          if (response.ok) {
            const data = await response.json();
            const formattedData = JSON.parse(data.itinerary)
            setRecommendations(formattedData.restaurants);
            typingEffect()
          } else {
            console.error('Error generating recommendations');
          }
    
          setIsLoading(false);
        } catch (error) {
          console.error('Error:', error);
        }
        };

        const typingEffect = () => {
              const introMessage = "Here's some restaurants I think you might like:";
              let currentMessage = '';
              let currentIndex = 0;
              const typingInterval = setInterval(() => {
                if (currentIndex < introMessage.length) {
                  currentMessage += introMessage[currentIndex];
                  setTypingMessage(currentMessage);
                  currentIndex++;
                } else {
                  clearInterval(typingInterval);
                }
              }, 50);
              return () => clearInterval(typingInterval);
            
          }

  return (
    <div>
        <button className='AI-suggestion-button' onClick={handleClick} data-testid="AI-button">AI food finder</button>
        <Modal
        className='fade-in'
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
        size='md'
      > 

        <Modal.Body className='registrationModal'>
            <form>
            <div>
          <label htmlFor="location" className="block text-sm font-primary leading-6 text-gray-900">Input your location:</label>
          <div className="mt-2 location-input-container">
            <input
              type="text"
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="location-input block w-full rounded-tl-md rounded-bl-md border-0 py-1.5 pl-2 text-gray-900 outline-none shadow-sm"
              value={currentLocation}
              data-testid='location-input'
            />

            <button className="use-my-location-button flex w-14. justify-center items-center rounded-tr-md rounded-br-md bg-theme-blue px-3 py-1.5 text-sm font-primary leading-6 text-white shadow-sm hover:opacity-75" onClick={getLocation} title="Use my current location">

                {locationLoading? 'loading...': <FontAwesomeIcon icon={faLocationCrosshairs} size='xl' />}
        </button>
          </div>

          <label htmlFor="user-preferences" className="mt-2 block text-sm font-primary leading-6 text-gray-900">Any preferences?</label>
          <input
              type="text"
              onChange={(e) => setPreferences(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 outline-none shadow-sm"
              placeholder='e.g. "steak" or "fast-food"'
              
            />

          <button className=" mt-4 mb-4 flex w-full justify-center rounded-md bg-theme-blue px-3 py-1.5 text-sm font-primary leading-6 text-white shadow-sm hover:opacity-75" onClick={findFood} data-testid='find-food'>
            {isLoading? 'Finding food near you...' : 'Find me food'}</button>
        </div>

            </form>

            {isLoading? (
                <div className='loading-icon-container'>
                <img className="loading-icon" src={image} alt="Loading" />
                </div>
            ): 
            <section className='recommendations-container'>
                <p><strong>{typingMessage}</strong></p>
                {recommendations.map((restaurant) => (
                    <div key={restaurant.name}>
                        <h2 className='mt-4'>{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                        <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' near ' + currentLocation)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps
      </a>
                    </div>

                ))}
            </section>
}
            </Modal.Body>
            </Modal>
    </div>
  )
}
