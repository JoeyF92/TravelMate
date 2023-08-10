import React, { useState } from 'react';
import './styles.css';
import { ItineraryForm, ItineraryDisplay } from '../../components';

function ItineraryGenerator() {
  const [itinerary, setItinerary] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false)
  const [showItineraryForm, setShowItineraryForm] = useState(false)

  const handleGenerateItinerary = async (formData) => {
    try {
      setIsLoading(true);

      // get userpreferences from database
      const userPreferences = [''];
      const { location, startDate, endDate, budget, occasion } = formData;
      const prompt = `Hello, I am a software designed to assist in planning vacations based on user input. To help create an itinerary, I'd like you to suggest an itinerary for a trip based on these parameters: location: ${location}, dates: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}, budget: £${budget}, occasion: ${occasion}, and user hobbies/interests: ${userPreferences}. Please ensure the itinerary generated matches with the budget and occasion, so if it is a high budget suggest expensive activities and if low suggest cheap or free activities. Please provide your recommendations in a JSON format, using uppercase keys like DAY1, DAY2, etc., each with a title for the day and a description of activities. The title should start with the date then the title of the day outlining the day’s activities. The description should contain the activities as a list of items, with each item ending with an estimated price where appropriate, for instance: {DAY1: {title: date "Explore a historic landmark", description: ["Discover the rich history of the city through its iconic sites. £20", "Take a guided tour. £15"]}, DAY2: {title: date "Visit an art museum", description: ["Admire famous artworks from around the world. £5"]}}. Keep your responses concise, focusing solely on the travel itinerary. Avoid recommending specific events that may not be available on certain days. For instance, instead of suggesting a football match, propose a stadium visit and the possibility of catching a game if one is scheduled.`

      const response = await fetch('http://127.0.0.1:5000/itinerary/generate_itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setItinerary(data.itinerary);
      } else {
        console.error('Error generating itinerary');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShow = () => {
    // const response = await fetch(`/itinerary/:groupid`)
    const hasItinerary = false //placeholder
    hasItinerary? setShowItinerary(true): setShowItineraryForm(true)
    
  }
  return (
    <div className="TravelItineraryGenerator">
      <header>
        <h1>Travel Itinerary Generator</h1>
      </header>
      <button className="itinerary-button" onClick={handleShow}>Itinerary</button>
      <ItineraryForm onSubmit={handleGenerateItinerary} isLoading={isLoading} showItineraryForm={showItineraryForm} setShowItineraryForm={setShowItineraryForm} showItinerary={showItinerary} setShowItinerary={setShowItinerary}/>
      <ItineraryDisplay isLoading={isLoading} itinerary={itinerary} setItinerary={setItinerary} showItinerary={showItinerary} setShowItinerary={setShowItinerary} />
    </div>
  );
}

export default ItineraryGenerator;
