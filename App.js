import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import GoogleFit, {Scopes} from 'react-native-google-fit';

function App() {
  useEffect(() => {
    const options = {
      scope: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('AUTH_SUCCESS');
        } else {
          console.log('AUTH_DENIED', authResult);
        }
      })
      .catch(() => {
        console.log('AUTH_ERROR');
      });
  });

  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
