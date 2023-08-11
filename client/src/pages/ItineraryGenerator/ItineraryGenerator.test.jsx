import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import ItineraryGenerator from '.';
import { BrowserRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe("Itinerary Generator Page", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
        <ItineraryGenerator />
        </BrowserRouter>);
    });
    
    afterEach(() => {
        cleanup();
    });

    it("displays the page header", () => {
        const header = screen.getByText("Travel Itinerary Generator");
        expect(header).toBeInTheDocument();
    });

    it("displays the 'Itinerary' button", () => {
        const itineraryButton = screen.getByTestId("itinerary-button");
        expect(itineraryButton).toBeInTheDocument();
    });

});
