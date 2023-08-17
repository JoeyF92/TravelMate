import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {fireEvent, screen, render, cleanup, waitFor } from '@testing-library/react';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import PackingList from '.'
import { AuthProvider } from "../../contexts";

describe("Packing List Page", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
            <BrowserRouter>
                <PackingList />
            </BrowserRouter>
            </AuthProvider>
        );
    });
    
    afterEach(() => {
        cleanup();
    });

    // it('displays header', () => {
    //     const header = screen.getByText(/Packing List/i)
    //     expect(header).toBeInTheDocument()
    // })

    it('displays loading message', () => {
        const loadingMessage = screen.getByText('Loading user information...')
        expect(loadingMessage).toBeInTheDocument()
    })

})