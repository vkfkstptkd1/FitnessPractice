import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
function Recentprofilecard({
  user,
  locations,
}) {
  const navigation = useNavigation();

  const onOpenProfile = () => {
    //사용자 프로필 화면 열기
  };
  const onPress = () => {
    navigation.push('RecommendMap', locations);
  };

  return (
    <TouchableOpacity style={styles.rec}>
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
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
          <Text style={styles.displayName}>{user.displayName}</Text>
        </Pressable>
        <TouchableOpacity style={styles.map} onPress={onPress}>
          <Text style={styles.date}>지도 보기 {'>'}</Text>
        </TouchableOpacity>
        </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 8,
    borderColor: '#bdbdbd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    lineHeight: 16,

  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    borderColor: '#bdbdbd',
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
  info: {
    color: 'white',
    fontSize: 14,
    marginBottom: 1,
    borderColor: '#bdbdbd',
  },
  button: {
    marginVertical: 15,
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rec: {
    marginHorizontal: '5%',
    //height: 120,
    //backgroundColor: 'rgba(48,47,47,1)',
    marginVertical: 4,
    borderRadius: 16,
    backgroundColor:'rgba(48,47,47,1)'
  },
});

export default Recentprofilecard;