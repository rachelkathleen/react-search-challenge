import { ProfileContext } from '../components/ProfilesContextProvider';
import { render, screen } from '@testing-library/react';
import mockProfile from '../mocks/mockProfile';
import mockResponse from '../mocks/mockResponse';
import ProfilePage from '../components/ProfilePage';
import React from 'react';

describe('Profile Page', () => {
  test('UserGreeter salutes a user', () => {
    const mockProps = {
      match: {
        params: {
          id: 50040631,
        },
      },
    };

    render(
      <ProfileContext.Provider value={{ profiles: mockResponse.animals }}>
        <ProfilePage {...mockProps} />
      </ProfileContext.Provider>
    );
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
  });
});
