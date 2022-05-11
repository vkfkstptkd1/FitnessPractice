import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import HealthScreen from './HealthScreen';
import MapScreen from './MapScreen';
import FeedScreen from './FeedScreen';
import FindFriendScreen from './FindFriendScreen';
import AlarmScreen from './AlarmScreen';
import {useUserContext} from '../contexts/UserContext';
import SettingScreen from './SettingScreen';

const Tab = createMaterialBottomTabNavigator();

function MainTab() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      {/*user.photoURL && (
        <Image
          source={{uri: user.photoURL}}
          style={{width: 128, height: 128, marginTop: 16}}
          resizeMode="cover"
        />
      )*/}
      <Tab.Navigator labeled={true} 
                     barStyle={{backgroundColor: '#4A4A4A'}}
                     initialRouteName="home">
        <Tab.Screen
          name="Home"
          component={HealthScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={MapScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="place" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={FindFriendScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="person-search" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="wallpaper" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});

export default MainTab;
