import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {LinearProgress} from 'react-native-elements';
import {useUserContext} from '../contexts/UserContext';

function HealthInfo(props) {
  const {achieveinfo} = useUserContext();
  const [progress, setProgress] = React.useState(0);
  const navigation = useNavigation();
  const userinfo = {
    name: '민주홍',
    title: '',
    color: '',
    achieve: props.achieve,
    goal: 0,
    format: '',
  };

  switch (props.title) {
    case 'dist':
      userinfo.title = '이동 거리';
      userinfo.color = '#167AEF';
      userinfo.goal = achieveinfo.dist;
      userinfo.format = '미터';

      break;
    case 'step':
      userinfo.title = '일일 걸음수';
      userinfo.color = '#84F10B';
      userinfo.goal = achieveinfo.step;
      userinfo.format = '걸음';
      break;
    case 'cal':
      userinfo.title = '칼로리 소모량';
      userinfo.color = '#D60720';
      userinfo.goal = achieveinfo.kcal;
      userinfo.format = 'kcal';
      break;
    case 'duration':
      userinfo.title = '오늘 산책한 시간';
      userinfo.color = '#9028EB';
      userinfo.goal = achieveinfo.Htime;
      userinfo.format = '분';
      break;
  }

  const wd = userinfo.achieve / userinfo.goal;

  React.useEffect(() => {
    let subs = true;
    if (progress < wd && progress !== 0) {
      setTimeout(() => {
        if (subs) {
          setProgress(wd);
        }
      }, 100);
    }
    return () => {
      subs = false;
    };
  }, [progress]);

  React.useEffect(() => {
    setProgress(0.0001);
  }, [wd]);

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push('Graph', {userinfo})}>
        <View style={styles.rect}>
          <Text style={styles.text}>{userinfo.title}</Text>
          <View style={styles.group}>
            <View style={styles.graph3}>
              <LinearProgress
                style={styles.graph2}
                value={progress}
                color={userinfo.color}
                variant="determinate"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    borderRadius: 17,
    marginHorizontal: '5%',
  },
  button: {
    flex: 1,
    opacity: 1,
    borderRadius: 17,
  },
  rect: {
    flex: 1,
    backgroundColor: 'rgba(48,47,47,1)',
    borderRadius: 17,
    elevation: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    marginTop: '3%',
    marginBottom: '1%',
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  group: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  graph3: {
    width: '100%',
    height: '30%',
    backgroundColor: 'gray',
    borderRadius: 12,
  },
  graph2: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: 'gray',
  },
});

export default HealthInfo;
