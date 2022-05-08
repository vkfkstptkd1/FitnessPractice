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

function HealthScreen() {
  const {user, setUser} = useUserContext();
  const [info, setInfo] = useState();

  useEffect(() => {
    fetchData().then(res => {
      setInfo(res);
      const user_ = {
        id: user.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userinfo: res,
      };
      setUser(user_);
      createUser(user_);
    });
  }, []);

  if (!info) {
    return <View></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form1}>
        <Text style={[styles.text, styles.maintitle, {marginVertical: 15}]}>
          {' '}
          오늘의 운동 추천
        </Text>
        <RecommendForm />
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
        <Text style={[styles.text, styles.maintitle]}> 운동중인 친구</Text>
        <TouchableOpacity style={[styles.rec, {height: 80}]}></TouchableOpacity>
        <TouchableOpacity style={[styles.rec, {height: 80}]}></TouchableOpacity>
        <TouchableOpacity style={[styles.rec, {height: 80}]}></TouchableOpacity>
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
    height: 120,
    backgroundColor: 'rgba(48,47,47,1)',
    marginVertical: 4,
    borderRadius: 16,
  },
});

export default HealthScreen;
