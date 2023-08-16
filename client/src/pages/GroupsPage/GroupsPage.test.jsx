import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {fireEvent, screen, render, cleanup, waitFor } from '@testing-library/react';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import GroupsPage from '.'
import { AuthProvider } from "../../contexts";

describe("Groups Page", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
            <BrowserRouter>
                <GroupsPage />
            </BrowserRouter>
            </AuthProvider>
        );
    });
    
    afterEach(() => {
        cleanup();
    });

    it('renders h2 element', () => {
        const h2Element = screen.getByText(/Begin Your New Adventure/i)
        expect(h2Element).toBeInTheDocument()
    })

    it('renders the join group form', () => {
        const label = screen.getByLabelText('Join an existing group:')
        expect(label).toBeInTheDocument()

    })

    it('renders the new group form', () => {
        const label = screen.getByText('Start a New Group')
        expect(label).toBeInTheDocument()

        
    })

    //test buttons

    it('shows new group form when pressing create', async () => {
        const create = screen.getByText('Create')
        fireEvent.click(create)

       

        expect(await screen.getByText('Description:')).toBeInTheDocument()
        expect(await screen.getByText('x')).toBeInTheDocument()

        const closeButton = screen.getByText('x')
        fireEvent.click(closeButton)

        expect(await screen.getByText('Start a New Group'))
 
    })

    it('submits join group form', async() => {
        const submit = screen.getByTestId('join-group-button')
        fireEvent.click(submit)

        expect(await screen.queryByText('enter code')).toBeNull()


    })

})