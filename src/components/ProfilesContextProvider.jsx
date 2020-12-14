import React from 'react';
import client from '../utils/client.js';

export const ProfileContext = React.createContext({
  profiles: [],
});

function ProfilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case 'getProfiles':
      profiles = action.payload;
      return { profiles };
    case 'ascending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name > profileB.name ? 1 : -1));
      return { profiles };

    case 'descending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name < profileB.name ? 1 : -1));
      return { profiles };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: [],
  });

  React.useEffect(() => {
    getProfiles();
  }, []);

  async function getProfiles() {
    const promise = client.animal;
    const response = await promise.search({ limit: 60 });
    const profiles = response.data.animals;
    const filteredProfiles = profiles.filter((pet) => pet.photos.length > 0);

    dispatch({ type: 'getProfiles', payload: filteredProfiles });
  }

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
