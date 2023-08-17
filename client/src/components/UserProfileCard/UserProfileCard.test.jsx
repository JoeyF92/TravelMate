import React from 'react';
import axios from 'axios';
import { describe, it, expect, beforeEach, afterEach, vi, test, mock } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { UserProfileCard } from '../../components'; 
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);


describe('UserProfileCard Component', () => {

  beforeEach(() => {
    vi.mock('axios', { get: async () => ({ status: 200, data: {  username: 'mockUsername',
    first_name: 'Mock',
    last_name: 'User',
    email: 'mock@example.com',
    userId: '1'}
   }) 
  });

        render(<UserProfileCard />);
  });

  afterEach(() => {
    cleanup()
    vi.unmock('axios');
  });

  it('renders loading message when user is null', () => {
    const loadingMessage = screen.getByText('Loading user information...');
    expect(loadingMessage).toBeInTheDocument();
  });

//   test('renders full name', async () => {
//     render(<UserProfileCard />);
//     const mockUser = {
//       username: 'mockUsername',
//       first_name: 'Mock',
//       last_name: 'User',
//       email: 'mock@example.com',
//       userId: '1'
//     };
//     axios.get.mockResolvedValue({
//       data: mockUser
//     })

//     const user = await getUserInfo()

//     expect(axios.get).toHaveBeenCalledWith(`${config.baseUrl}/user/${userId}`)
    
//     const fullNameElement = screen.getByText(/Full/);

//     expect(fullNameElement).toBeInTheDocument();
// });

// it('renders user information', async () => {
//   // await screen.findByText('mockUsername'); 

//   // // Check that user information is rendered
//   // const usernameElement = screen.getByText('mockUsername');

//   // expect(usernameElement).toBeInTheDocument();
 
// });
})

