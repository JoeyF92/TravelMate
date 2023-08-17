import { describe, it, expect, beforeEach, afterEach} from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import PackingListForm from '.';
import { BrowserRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
import { AuthProvider } from '../../contexts';
expect.extend(matchers);



describe("Packing List Form", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <PackingListForm />
                </BrowserRouter>
            </AuthProvider>);
    });
    
    afterEach(() => {
        cleanup();
    });

it('renders packing list form', () => {
    const form = screen.getByTestId('packing-form')
    expect(form).toBeInTheDocument()
})

})