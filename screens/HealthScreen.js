import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import HealthInfo from '../components/HealthInfo';
import RecommendForm from '../components/RecommendForm';
import {fetchData} from '../lib/fit';
import {useUserContext} from '../contexts/UserContext';
import {createUser} from '../lib/users';
import SplashScreen from 'react-native-splash-screen';
import {getRecommendPosts} from '../lib/posts';
import RecentFriendScreen from './RecentFriendScreen';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

function HealthScreen() {
  const {user, setUser} = useUserContext();
  const [info, setInfo] = useState();
  const [posts, setPosts] = useState();

  const userid = user.followingid[getRandom(0, user.followingid.length)];
  if (!posts) {
    getRecommendPosts(userid).then(res => {
      setPosts(res[getRandom(0, res.length)]);
    });
  }

  const userinfoready = info !== null;
  useEffect(() => {
    if (userinfoready) {
      SplashScreen.hide();
    }
    fetchData().then(res => {
      setInfo(res);
      const user_ = {
        id: user.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userinfo: res,
        achieveinfo: user.achieveinfo,
        followingid: user.followingid,
      };

      setUser(user_);
      createUser(user_);
    });
  }, [userinfoready]);

  if (!info) {
    return <View></View>;
  }
  console.log(info);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form1}>
        <Text style={[styles.text, styles.maintitle, {marginVertical: 15}]}>
          {' '}
          오늘의 운동 추천
        </Text>
        <RecommendForm posts={posts} />
      </View>
      <View>
        <Text style={[styles.text, styles.maintitle]}> 건강 정보</Text>
        {info ? (
          <>
            <HealthInfo
              style={styles.healthInfo}
              title={'step'}
              achieve={info.step}
            />
            <HealthInfo
              style={styles.healthInfo}
              title={'cal'}
              achieve={info.kcal}
            />
            <HealthInfo
              style={styles.healthInfo}
              title={'dist'}
              achieve={info.dist}
            />
            <HealthInfo
              style={styles.healthInfo}
              title={'duration'}
              achieve={info.Htime}
            />
          </>
        ) : (
          <></>
        )}
      </View>
      <View>
        <Text style={[styles.text, styles.maintitle]}> 최근 운동한 친구 </Text>
          <RecentFriendScreen/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'roboto-regular',
  },
  maintitle: {
    marginLeft: '5%',
    marginVertical: 10,
    fontSize: 24,
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: '#000000',
  },
  form1: {
    flex: 1,
  },
  ex: {
    flex: 1,
    backgroundColor: 'red',
  },
  healthInfo: {
    marginTop: '1%',
    marginBottom: '1%',
    height: 100,
  },

  rec: {
    marginHorizontal: '5%',
    //height: 120,
    backgroundColor: 'rgba(48,47,47,1)',
    marginVertical: 4,
    borderRadius: 16,
  },
});

export default HealthScreen;
