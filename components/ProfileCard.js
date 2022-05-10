import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {createUser} from '../lib/users';
const onOpenProfile = () => {
  //사용자 프로필 화면 열기
};

function ProfileCard({displayName, photoURL, isFriend}) {
  const buttontitle = isFriend ? '친구끊기' : '친구맺기';

  const {user, setUser} = useUserContext();
  const istrue = value => {
    return value === displayName;
  };

  const onSubmit = () => {
    if (user.followingid.some(istrue)) {
      console.log('이미 친구임 ');
    } else {
      const user_ = {
        id: user.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userinfo: user.userinfo,
        achieveinfo: user.achieveinfo,
        followingid: [...user.followingid, displayName],
      };

      createUser(user_);
      setUser(user_);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Image
            source={
              photoURL
                ? {
                    uri: photoURL,
                  }
                : require('../assets/user.png')
            }
            resizeMode="cover"
            style={styles.avatar}
          />
          <Text style={styles.displayName}>{displayName}</Text>
        </Pressable>
      </View>
      <View style={styles.button}>
        <CustomButton
          onPress={onSubmit}
          title="친구맺기"
          //hasMarginLeft
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 0.7,
    borderColor: '#bdbdbd',
  },
  button: {
    borderColor: '#bdbdbd',
    //marginRight: -8,
    borderBottomWidth: 0.7,
  },
  avatar: {
    marginLeft: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    color: 'white',
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});

export default ProfileCard;
