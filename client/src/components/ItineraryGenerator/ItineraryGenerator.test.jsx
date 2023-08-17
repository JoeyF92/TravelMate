import React from 'react'; 

import { createContext } from 'react';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import ItineraryGenerator from '.';
import { BrowserRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
// import ItineraryDisplay from '../ItineraryDisplay';
import { AuthProvider } from '../../contexts';
expect.extend(matchers);



describe("Itinerary Generator", () => {
    beforeEach(() => {
    //     vi.mock('react', async () => {
    //         const actual = await vi.importActual('react');
    //         return {
    //             ...actual,
    //             useState: (initialState) => [initialState, vi.fn()],
    //         };
    //     });
        render(
            <AuthProvider>
                <BrowserRouter>
                    <ItineraryGenerator />
                </BrowserRouter>
            </AuthProvider>);
    });
    
    afterEach(() => {
        cleanup();
    });


    it("displays the 'Itinerary' button", () => {
        const itineraryButton = screen.getByTestId("itinerary-button");
        expect(itineraryButton).toBeInTheDocument();
    });

    it("displays the Itinerary form on click", async () => {
       
        const itineraryButton = screen.getByTestId("itinerary-button");
        fireEvent.click(itineraryButton)

        expect(await screen.findByText(/Generate Your Itinerary/i)).toBeInTheDocument();

        //displays itinerary when clicking generate

        const generateButton = screen.getByTestId('generate-button')
        fireEvent.click(generateButton)

        expect(await screen.getByText(/my itinerary/i)).toBeInTheDocument()
        expect(await screen.getByText('Save'))
        

        // //test closing modal
        // const outsideElement = document.body;
        // fireEvent.click(outsideElement)
        // expect(vi.mocked(setShowItineraryForm)).toHaveBeenCalled();




    })
})

    


describe("Itinerary", () => {
    beforeEach(async () => {
        render(
            <AuthProvider>
            <BrowserRouter>
                <ItineraryGenerator />
            </BrowserRouter>
        </AuthProvider>);

        const itineraryButton = screen.getByTestId("itinerary-button");
        fireEvent.click(itineraryButton)

        expect(await screen.findByText(/Generate Your Itinerary/i)).toBeInTheDocument();

        const generateButton = screen.getByTestId('generate-button')
        fireEvent.click(generateButton)
        expect(await screen.getByTestId("ai-message")).toBeInTheDocument()

        
    })

    afterEach(() => {
        cleanup()
    })

    // it("displays AI message on itinerary display", async () => {
    //     const generateButton = screen.getByTestId('generate-button')
    //     fireEvent.click(generateButton)

    //     //wait for itinerary display to load
    //     expect(await screen.getByTestId("ai-message")).toBeInTheDocument()
    // })

    it("closes when you press delete", async () => {
        const deleteButton = screen.getByText('Delete')
        fireEvent.click(deleteButton)
        expect(await screen.queryByText('Form')).toBeNull()
    })

})


