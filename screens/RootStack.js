import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './MainTab';
import GraphScreen from './GraphScreen';
import WriteScreen from './WriteScreen';
import TrackScreen from './TrackScreen';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4A4A4A'},
        headerTintColor: 'white',
      }}>
      {user ? (
        <>
          <Stack.Screen
            name="Maintab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Graph"
            component={GraphScreen}
            options={{headerTitle: '상세정보'}}
          />
          <Stack.Screen
            name="Write"
            component={WriteScreen}
            options={{headerTitle: '운동일지'}}
          />
          <Stack.Screen name="Track" component={TrackScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
