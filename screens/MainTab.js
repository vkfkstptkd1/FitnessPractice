import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View, Image} from 'react-native';
import HealthScreen from './HealthScreen';
import MapScreen from './MapScreen';
import FeedScreen from './FeedScreen';
import FindFriendScreen from './FindFriendScreen';
import AlarmScreen from './AlarmScreen';
import {useUserContext} from '../contexts/UserContext';

const Tab = createMaterialBottomTabNavigator();

function MainTab() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      {user.photoURL && (
        <Image
          source={{uri: user.photoURL}}
          style={{width: 128, height: 128, marginTop: 16}}
          resizeMode="cover"
        />
      )}
      <Tab.Navigator labeled={false} barStyle={{backgroundColor: '#4A4A4A'}}>
        <Tab.Screen
          name="Health"
          component={HealthScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={24} color={color} />
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
          name="Find"
          component={FindFriendScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="person-search" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="place" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Alarm"
          component={AlarmScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="push-pin" size={24} color={color} />
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
