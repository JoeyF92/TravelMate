import React from 'react';
import image from '../../assets/Logo-globe.png';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function ItineraryDisplay({ isLoading, itinerary, setItinerary, showItinerary, setShowItinerary, location }) {
    const [newActivity, setNewActivity] = useState('');
    const [addingActivityForDay, setAddingActivityForDay] = useState(null);
    const [generatingActivityForDay, setGeneratingActivityForDay] = useState({});
    const [typingMessage, setTypingMessage] = useState('')

    const handleClose = () => setShowItinerary(false);

    const handleDelete = (index, day) => (e) => {
        e.stopPropagation()
        // Parse the current itinerary from the state
        const parsedItinerary = JSON.parse(itinerary);

        // Find the selected day
        const selectedDay = parsedItinerary[day];

        if (!selectedDay) return;

        const updatedDescription = [
            ...selectedDay.description.slice(0, index),
            ...selectedDay.description.slice(index + 1)
        ];

        // Update the day's description or remove it if no activities remain
        const updatedItinerary = {
            ...parsedItinerary,
            [day]: {
                ...selectedDay,
                description: updatedDescription.length > 0 ? updatedDescription : []
            }
        };

        // Update the state with the modified itinerary
        setItinerary(JSON.stringify(updatedItinerary));
    }

    const handleAddActivity = (day) => {
        setAddingActivityForDay(day);
    }

    const handleSaveActivity = (e, day) => {
        e.preventDefault();

        if (newActivity.trim() === '') return;

        const parsedItinerary = JSON.parse(itinerary);
        const selectedDay = parsedItinerary[day];

        if (!selectedDay) return;

        const updatedItinerary = {
            ...parsedItinerary,
            [day]: {
                ...selectedDay,
                description: [...selectedDay.description, newActivity]
            }
        };

        setItinerary(JSON.stringify(updatedItinerary));
        setNewActivity('');
        setAddingActivityForDay(null);
    }

    const handleCancelActivity = () => {
        setNewActivity('');
        setAddingActivityForDay(null);
    }

    const handleGenerateActivity = async (day) => {
        try {
            setGeneratingActivityForDay((prev) => ({ ...prev, [day]: true }));

            const prompt = `Hello, I am a software designed to assist in planning vacations based on user input. To help create an itinerary, I got you to suggest an itinerary for a trip to ${location} based on these parameters: location, dates, budget, occasion, and user hobbies/interests. This is the response you gave: ${itinerary}. This prompt I'm sending to you now is sent when a user selects the 'generate new activity' button. I would like you to come up with a new activity suggestion that is completely unique to any of the ones you gave in your previous response, it is crucial that it is different to any of the ones in the itinerary already. Please write the activity in the same style as the items in the description list with an estimated price for the activity, and respond in json format with a 'generated_activity' key like this: {"generated_activity": "Discover the vibrant street art scene in (location) by taking a self-guided tour or joining a guided street art walking tour. Free or £10 for a guided tour."}  Keep your responses concise, focusing solely on the generated_activity.`

            const response = await fetch('http://127.0.0.1:5000/itinerary/generate_itinerary', {
                method: 'POST' , 
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ user_input: prompt }),
            })

            if(response.ok){
                const data = await response.json();
                const itineraryJSON = JSON.parse(data.itinerary)
                const generatedActivity = itineraryJSON.generated_activity
                const parsedItinerary = JSON.parse(itinerary);
                const selectedDay = parsedItinerary[day]

                if(!selectedDay) return;

                const updatedItinerary = {
                    ...parsedItinerary,
                    [day]: {
                        ...selectedDay,
                        description: [...selectedDay.description, generatedActivity]
                    }
                }

                setItinerary(JSON.stringify(updatedItinerary))
                setGeneratingActivityForDay((prev) => ({ ...prev, [day]: false }));
            } else {
                console.error('Error generating activity')
                setGeneratingActivityForDay((prev) => ({ ...prev, [day]: false }));
            }

        } catch (error) {
            console.error('Error', error)
            setGeneratingActivityForDay((prev) => ({ ...prev, [day]: false }));

        }
    }

    const handleSaveItinerary = async () => {
        const album_id = 1; // Placeholder, need dynamic album_id
    
        try {
            // Check itinerary exists before attempting to delete
            const checkResponse = await fetch(`http://127.0.0.1:5000/itinerary/${album_id}`);
            
            if (checkResponse.status === 404) {
                // save the new itinerary directly
                const saveResponse = await fetch('http://127.0.0.1:5000/itinerary/save_itinerary', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ album_id: album_id, itinerary: itinerary }),
                });
    
                if (saveResponse.ok) {
                    alert('Itinerary saved successfully!');
                } else {
                    console.error('Error saving itinerary');
                }
            } else if (checkResponse.ok) {
                // Delete existing itinerary if exists
                const deleteResponse = await fetch(`http://127.0.0.1:5000/itinerary/delete_itinerary/${album_id}`, {
                    method: 'DELETE'
                });
    
                if (deleteResponse.ok) {
                    // Save the new itinerary
                    const saveResponse = await fetch('http://127.0.0.1:5000/itinerary/save_itinerary', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ album_id: album_id, itinerary: itinerary }),
                    });
    
                    if (saveResponse.ok) {
                        alert('Itinerary saved successfully!');
                    } else {
                        console.error('Error saving itinerary');
                    }
                } else {
                    console.error('Error deleting itinerary');
                }
            } else {
                console.error('Error checking itinerary');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleDeleteItinerary = async () => {
        setShowItinerary(false)
        const album_id = 1 //need dynamic album id
        const response = await fetch(`http://127.0.0.1:5000/itinerary/delete_itinerary/1`, {
            method: 'DELETE'
        })

        if (response.ok) {
            alert('Itinerary successfully deleted')
        } else {
            console.error('Error deleting itinerary')
        }
    }

    useEffect (() => {
    
        const introMessage = `Check out this tailored itinerary for ${location}. You can tweak activities, or generate new ideas by hitting the button!`;
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
        }, 30);
        return () => clearInterval(typingInterval);
      }, [isLoading])

    return (
        <>
        <Modal
        className='fade-in'
        show={showItinerary}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
        size='lg'
      > 

      <Modal.Header className='registrationModal modal-borders'>
        <h1 className='itinerary-header'>My Itinerary</h1>
        <p className='AI-message'><strong>{isLoading? null: typingMessage}</strong></p>
      </Modal.Header>

        <Modal.Body className='registrationModal'>

        <section className="itinerary-container">
    {isLoading ? (
        <img className="loading-icon" src={image} alt="Loading" />
    ) : (
        itinerary !== undefined && (
            <div className="itinerary">
                {(() => {
                    try {
                        const parsedItinerary = JSON.parse(itinerary);
                        return Object.entries(parsedItinerary).map(([day, { title, description }]) => (
                            <article key={day} className="activity">
                                <h2 className="activity-heading">{title}</h2>
                                <ul className="activity-description">
                                    {description.map((activity, index) => (
                                        <li key={index} onClick={handleDelete(index, day)}>
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                                {addingActivityForDay === day ? (
                                    <div>
                                        <form onSubmit={(e) => handleSaveActivity(e, day)}>
                                            <input
                                                type="text"
                                                value={newActivity}
                                                onChange={(e) => setNewActivity(e.target.value)}
                                                className="add-activity-input block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                            />
                                            <button className="save-add-activity" type="submit">Add</button>
                                            <button className="cancel-add-activity" type="button" onClick={handleCancelActivity}>Cancel</button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className='activity-buttons'>
                                        <button className="add-activity-button transform-scale" onClick={() => handleAddActivity(day)}>+</button>
                                        <button className='generate-activity-button transform-scale' onClick={() => handleGenerateActivity(day)} disabled={generatingActivityForDay[day]}>
                                            {generatingActivityForDay[day] ? 'Generating...' : 'Generate new activity'}
                                        </button>
                                    </div>
                                )}
                            </article>
                        ));
                    } catch (error) {
                        console.error('Error parsing itinerary:', error);
                        return null;
                    }
                })()}
            </div>
        )
    )}
</section>

        </Modal.Body>
        <Modal.Footer className='registrationModal modal-borders'>
        
            {isLoading? null : 
            <div className="itinerary-header">
            <button className="save-itinerary-button" onClick={handleSaveItinerary}>Save</button>
            <button className="save-itinerary-button" onClick={handleDeleteItinerary}>Delete</button>
            </div>
            }
            
        </Modal.Footer>
        </Modal>
        </>
    );
}

export default ItineraryDisplay;
