import React from 'react';
import image from '../../assets/Logo-globe.png';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ItineraryDisplay({ isLoading, itinerary, setItinerary, showItinerary, setShowItinerary }) {
    const [newActivity, setNewActivity] = useState('');
    const [addingActivityForDay, setAddingActivityForDay] = useState(null);

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

    const handleSaveItinerary = async () => {
        console.log(itinerary)
        console.log(JSON.parse(itinerary))
        const album_id = 1 //placeholder, need dynamic album_id
        const response = await fetch('http://127.0.0.1:5000/itinerary/save_itinerary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ album_id: album_id, itinerary: itinerary }),
          });

          if (response.ok) {
            const data = await response.json();
            alert('Itinerary saved successfully!')
          } else {
            console.error('Error saving itinerary');
          }
       
    }

    const handleDeleteItinerary = async () => {
        const album_id = 1 //need dynamic album id
        const response = await fetch(`http://127.0.0.1:5000/itinerary/delete_itinerary/1`, {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log(response)
            setShowItinerary(false)
        } else {
            console.error('Error deleting itinerary')
        }
    }

    return (
        <>
        <Modal
        className='fade-in'
        show={showItinerary}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      > 

        <Modal.Body className='registrationModal'>
        <div className="itinerary-header">
            <button className="save-button" onClick={handleSaveItinerary}>Save</button>
            <button className="delete-button" onClick={handleDeleteItinerary}>Delete</button>
          </div>

        <section className="itinerary-container">
            {isLoading ? (
                <img className="loading-icon" src={image} alt="Loading" />
            ) : (
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
                                        <button className="add-activity-button" onClick={() => handleAddActivity(day)}>+</button>
                                    )}
                                </article>
                            ));
                        } catch (error) {
                            console.error('Error parsing itinerary:', error);
                            return null;
                        }
                    })()}
                </div>
            )}
        </section>
        </Modal.Body>
        </Modal>
        </>
    );
}

export default ItineraryDisplay;
