import React, { useEffect, useState } from 'react';
import { DateSelection } from '../../components';
import Modal from 'react-bootstrap/Modal';

function ItineraryForm({ onSubmit, isLoading, showItineraryForm, setShowItineraryForm, showItinerary, setShowItinerary }) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState('');
  const [occasion, setOccasion] = useState('');
  const [typingMessage, setTypingMessage] = useState('')

  const handleClose = () => {
    setShowItineraryForm(false);
    setTypingMessage('')
  }


  const handleGenerateClick = async (e) => {
    e.preventDefault();
    setShowItineraryForm(false)

    if (!isLoading){
      setShowItinerary(true)
    }

    if (!location) {
      alert("Please provide a destination.");
      return;
    }

    await onSubmit({ location, startDate, endDate, budget, occasion });
  };

  useEffect (() => {
    
    const introMessage = "Hello! I'm your TravelMate AI. Share your details, and I'll create a customised itinerary just for you!";
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
  }, [showItineraryForm])


  return (
    <>

    <Modal
        className='fade-in'
        show={showItineraryForm}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      > 
    
    <Modal.Body className='registrationModal'>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-primary mb-4">
                Generate Your Itinerary
              </h2>
              <p><strong>{typingMessage}</strong></p>
            </div>



    <section className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-2"> 
        <label htmlFor="start-date" className="block text-sm font-primary leading-6 text-gray-900">Start date:</label>
        <DateSelection selected={startDate} onChange={date => setStartDate(date)} />
        <label htmlFor="end-date" className="block text-sm font-primary leading-6 text-gray-900">End date:</label>
        <DateSelection selected={endDate} onChange={date => setEndDate(date)} />

        <div>
          <label htmlFor="destination" className="block text-sm font-primary leading-6 text-gray-900">Destination:</label>
          <div className="mt-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 outline-none shadow-sm"
              placeholder='required'
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="budget" className="block text-sm font-primary leading-6 text-gray-900">Budget (£):</label>
          <div className='mt-2'>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 outline-none shadow-sm"
              placeholder='optional'
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="occasion" className="block text-sm font-primary leading-6 text-gray-900">Occasion:</label>
          <div className='mt-2'>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 outline-none shadow-sm mb-10"
              placeholder='optional'
            />
          </div>
        </div>

        <button className=" mt-10 flex w-full justify-center rounded-md bg-theme-blue px-3 py-1.5 text-sm font-primary leading-6 text-white shadow-sm hover:opacity-75" onClick={handleGenerateClick} disabled={isLoading} data-testid="generate-button">
          {isLoading ? 'Generating your perfect holiday...' : 'Generate Itinerary'}
        </button>
      </form>
    </section>
    </div>
    </Modal.Body>
    </Modal>
    </>
  );
}

export default ItineraryForm;
