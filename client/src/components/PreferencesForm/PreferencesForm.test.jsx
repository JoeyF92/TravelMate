import { describe, it, expect, beforeEach, afterEach} from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import PreferencesForm from '.';
import { BrowserRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
import { AuthProvider } from '../../contexts';
expect.extend(matchers);



describe("Preferences Form", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <PreferencesForm />
                </BrowserRouter>
            </AuthProvider>);
    });
    
    afterEach(() => {
        cleanup();
    });

it('renders preferences form', () => {
    const heading = screen.getByText('Travel Profile')
    expect(heading).toBeInTheDocument()
})

it('renders edit mode on click of edit button, and reverts on click of submit', async () => {
    const editButton = screen.getByTestId('edit-button')
    expect(editButton).toBeInTheDocument()

    fireEvent.click(editButton)
    expect(await screen.getByText('Save')).toBeInTheDocument()

    fireEvent.click(editButton)
    expect(await screen.queryByText('Save')).toBeNull()



})

})