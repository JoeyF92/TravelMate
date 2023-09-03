import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {fireEvent, screen, render, cleanup, waitFor } from '@testing-library/react';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import GroupPage from '.'
import { AuthProvider } from "../../contexts";

describe("Group Page", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
            <BrowserRouter>
                <GroupPage />
            </BrowserRouter>
            </AuthProvider>
        );
    });
    
    afterEach(() => {
        cleanup();
    });

    it('renders Ai suggestion button', () => {
        const AIButton = screen.getByTestId("AI-button");
        expect(AIButton).toBeInTheDocument();
    })

    it('shows form input when pressing AI button', async () => {
        const AIButton = screen.getByTestId("AI-button");
        fireEvent.click(AIButton)

        expect(await screen.findByText(/input your location/i)).toBeInTheDocument()

        const findFoodButton = screen.getByTestId("find-food")
        fireEvent.click(findFoodButton)

        expect(await screen.findByAltText('Loading')).toBeInTheDocument()
    })


    it('gets user location on press of button', async () => {
        const AIButton = screen.getByTestId("AI-button");
        fireEvent.click(AIButton)

        expect(await screen.findByText(/input your location/i)).toBeInTheDocument()

        const locationButton = screen.getByTestId('get-location-button')
        fireEvent.click(locationButton)

        expect(await screen.getByText('loading...')).toBeInTheDocument()

    })

    it('location input works', async () => {
        const AIButton = screen.getByTestId("AI-button");
        fireEvent.click(AIButton)

        expect(await screen.findByText(/input your location/i)).toBeInTheDocument()

        const locationInput = screen.getByTestId('location-input')
        fireEvent.change(locationInput, {target: {value: 'Exeter, Devon'}});
        expect(locationInput.value).toBe('Exeter, Devon')

    })

})