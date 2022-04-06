import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {LinearProgress} from 'react-native-elements';

function HealthInfo(props) {
  const [progress, setProgress] = React.useState(0);

  const navigation = useNavigation();
  const userinfo = {
    name: '민주홍',
    title: '',
    color: '',
    achieve: 0,
    goal: 0,
    averge: 0,
  };

  userinfo.achieve = 125;
  userinfo.goal = 180;
  userinfo.averge = 174;

  switch (props.title) {
    case 'screen':
      userinfo.title = '스크린 타임';
      userinfo.color = '#167AEF';
      break;
    case 'step':
      userinfo.title = '일일 걸음수';
      userinfo.color = '#84F10B';
      break;
    case 'cal':
      userinfo.title = '칼로리 소모량';
      userinfo.color = '#D60720';
      break;
    case 'sleep':
      userinfo.title = '수면 시간';
      userinfo.color = '#9028EB';
      break;
    case 'stress':
      userinfo.title = '스트레스 수치';
      userinfo.color = '#F1E234';
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
