import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {signIn, signOut} from '../lib/auth';

function SettingScreen() {
  const {user, setUser} = useUserContext();

  const onPress = () => {
    setUser(null);
    signOut();
  };

  return (
    <View style={styles.block}>
      <View style={styles.userInfo}>
        <Image
          source={
            user.photoURL
              ? {
                  uri: user.photoURL,
                }
              : require('../assets/user.png')
          }
          resizeMode="cover"
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.displayName}</Text>
      </View>
      <View style={styles.button}>
        <CustomButton title="로그아웃" onPress={onPress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: '#000000',
  },
  button: {
    margin: 16,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  username: {
    marginTop: 16,
    fontSize: 24,
    color: '#bdbdbd',
  },
});
export default SettingScreen;
