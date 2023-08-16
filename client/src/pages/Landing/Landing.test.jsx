import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {fireEvent, screen, render, cleanup, waitFor } from '@testing-library/react';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Landing from '.'
import { AuthProvider } from "../../contexts";

describe("Landing Page", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
            <BrowserRouter>
                <Landing />
            </BrowserRouter>
            </AuthProvider>
        );
    });
    
    afterEach(() => {
        cleanup();
    });

    it("displays the title", () => {
        const title = screen.getByText("Welcome to");
        expect(title).toBeInTheDocument();
    });

    it("displays the subtitle", () => {
        const subtitle = screen.getByText("Your Ultimate Travel Companion");
        expect(subtitle).toBeInTheDocument();
    });

    it("displays the description", () => {
        const description = screen.getByText(/Embark on a journey of a lifetime with Travel Mate/i);
        expect(description).toBeInTheDocument();
    });

    it("displays 'Get started' button", () => {
        const getStartedButton = screen.getByText("Get started");
        expect(getStartedButton).toBeInTheDocument();
    });

    it("displays the logo image", () => {
        const logoImage = screen.getByAltText("Travel Mate logo");
        expect(logoImage).toBeInTheDocument();
    });

    it("Should show register form on click of get started button", async () => {
        const getStartedButton = screen.getByText("Get started");
        fireEvent.click(getStartedButton)

        expect(await screen.findByText(/Create an account/i)).toBeInTheDocument();
    })

    it("Should show login form on click of login button", async () => {
        const login = screen.getByText("Login");
        fireEvent.click(login)

        expect(await screen.findByText(/Sign in/i)).toBeInTheDocument();
    })

    it("update form input when typing", async () => {
        const login = screen.getByText("Login");
        fireEvent.click(login)

        expect(await screen.findByText(/Sign in/i)).toBeInTheDocument();

        const userName = screen.getByTestId('username-input')

        fireEvent.change(userName, {target: {value: 'Hello'}});

        expect(userName.value).toBe('Hello')


    })
});
