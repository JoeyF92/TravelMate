import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {fireEvent, screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NavigationBar from '.';

describe("Nav bar", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
        <NavigationBar/>
        </BrowserRouter>)
    })

    afterEach(() => {
        cleanup();
    })

    it('renders brand name', () => {
       const brandName= screen.getByText('Travel Mate')
       expect(brandName).toBeInTheDocument()
    })
})