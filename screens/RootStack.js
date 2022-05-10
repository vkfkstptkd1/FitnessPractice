import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './MainTab';
import GraphScreen from './GraphScreen';
import TrackScreen from './TrackScreen';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import UploadScreen from './UploadScreen';
import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser, achieveinfo, setAchieveInfo} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        SplashScreen.hide();
        return;
      }
      const profile = await getUser(currentUser.uid);

      if (!profile) {
        return;
      }
      setUser(profile);
      console.log(profile.achieveinfo);
      setAchieveInfo(profile.achieveinfo);
      console.log('a', achieveinfo);
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
            name="Upload"
            component={UploadScreen}
            options={{headerTitle: '운동 일지'}}
          />
          <Stack.Screen
            name="Track"
            component={TrackScreen}
            options={{headerTitle: ' 운동 경로'}}
          />
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
