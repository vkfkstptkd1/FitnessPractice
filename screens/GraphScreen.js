import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
import Healthgraph from '../components/Healthgraph';
import Buttongroup from '../components/Buttongroup';
import {
  fetchWeekdist,
  fetchWeekduration,
  fetchWeekkcal,
  fetchWeekStep,
} from '../lib/fit';
import Dialog from 'react-native-dialog';
import {useUserContext} from '../contexts/UserContext';
import {createUser, getAllUser} from '../lib/users';

const wd = Dimensions.get('window').width;

function GraphScreen({route}) {
  const {achieveinfo, user, setUser, setAchieveInfo} = useUserContext();
  const [weekinfo, setWeekinfo] = useState();
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState();

  getAllUser().then(res => {
    console.log(res[0].displayName);
  });

  let text_ = 0;
  switch (route.params.userinfo.format) {
    case '걸음':
      text_ = achieveinfo.step;
      break;
    case '미터':
      text_ = achieveinfo.dist;
      break;
    case 'kcal':
      text_ = achieveinfo.kcal;
      break;
    case '분':
      text_ = achieveinfo.Htime;
      break;
  }

  const [text, setText] = useState(text_);

  let max = 0;

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
    switch (route.params.userinfo.format) {
      case '걸음':
        achieveinfo.step = parseInt(text);
        setText(parseInt(text));
        break;
      case '미터':
        achieveinfo.dist = parseInt(text);
        setText(parseInt(text));
        break;
      case 'kcal':
        achieveinfo.kcal = parseInt(text);
        setText(parseInt(text));
        break;
      case '분':
        achieveinfo.Htime = parseInt(text);
        setText(parseInt(text));
        break;
    }
    const user_ = {
      id: user.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      userinfo: user.userinfo,
      achieveinfo: achieveinfo,
      followingid: user.followingid,
    };
    //console.log(user_);

    setUser(user_);
    createUser(user_);
  };

  useEffect(() => {
    switch (route.params.userinfo.format) {
      case '걸음':
        fetchWeekStep().then(res => {
          setWeekinfo(res);
        });
        break;
      case '미터':
        fetchWeekdist().then(res => {
          setWeekinfo(res);
        });
        break;
      case 'kcal':
        fetchWeekkcal().then(res => {
          setWeekinfo(res);
        });
        break;
      case '분':
        fetchWeekduration().then(res => {
          setWeekinfo(res);
        });
        break;
    }
  }, []);

  if (!weekinfo) {
    return <View style={styles.container}></View>;
  }
  for (var i = 0; i < weekinfo.length; i++) {
    if (max < weekinfo[i].value) {
      max = weekinfo[i].value + 50;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.maintitle, styles.text]}>
        {' '}
        {route.params.userinfo.title}
      </Text>
      <View style={styles.buttonform}>
        <View style={styles.rec}>
          <Text style={[styles.title, styles.text]}> 현재달성량 </Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={[styles.text, styles.data]}>
              {route.params.userinfo.achieve}
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: 20, marginBottom: 10, marginLeft: 5},
              ]}>
              {route.params.userinfo.format}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={showDialog}>
          <View style={styles.rec}>
            <Text style={[styles.title, styles.text]}> 목표량 </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={[styles.text, styles.data]}>{text}</Text>
              <Text
                style={[
                  styles.text,
                  {fontSize: 20, marginBottom: 10, marginLeft: 5},
                ]}>
                {route.params.userinfo.format}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.graphform}>
        <Text style={[styles.text, styles.titletext]}>주간 통계</Text>
        <Healthgraph
          weekinfo={weekinfo}
          max={max}
          format={route.params.userinfo.format}
        />
      </View>
      <View style={styles.statsform}>
        <Text style={[styles.text, styles.titletext]}>유저간 상위 통계</Text>
        <View style={[styles.rec, {width: wd - 32, height: 180}]}>
          <Buttongroup />
        </View>
      </View>
      <View style={styles.rateform}>
        <Text style={[styles.text, styles.titletext]}>친구들의 건강정보</Text>
        <View style={[styles.rec, {width: wd - 32, height: 80}]}></View>
        <TouchableOpacity
          style={[styles.rec, {width: wd - 32, height: 80}]}></TouchableOpacity>
        <TouchableOpacity
          style={[styles.rec, {width: wd - 32, height: 80}]}></TouchableOpacity>
      </View>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>목표량을 입력하세요!</Dialog.Title>
          <Dialog.Input
            placeholder={route.params.userinfo.format}
            keyboardType="number-pad"
            onChangeText={text => setText(text)}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="OK" onPress={handleOk} />
        </Dialog.Container>
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

  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  maintitle: {
    marginLeft: 15,
    marginTop: 15,
    fontSize: 24,
  },
  buttonform: {
    flex: 1,
    margin: 12,
    flexDirection: 'row',
  },
  rec: {
    height: 120,
    width: (wd - 40) / 2,
    backgroundColor: 'rgba(48,47,47,1)',
    margin: 4,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
  },
  data: {
    fontSize: 46,
    marginLeft: 13,
  },
  graphform: {
    margin: 12,
  },
  statsform: {
    flex: 1,
    margin: 12,
  },
  titletext: {fontSize: 24, marginLeft: 12, marginBottom: 6},
  rateform: {
    flex: 1,
    margin: 12,
  },
});

export default GraphScreen;
