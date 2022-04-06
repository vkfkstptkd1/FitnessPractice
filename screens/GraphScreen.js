import React from 'react';
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

const wd = Dimensions.get('window').width;

function GraphScreen({route}) {
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
              걸음
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <View style={styles.rec}>
            <Text style={[styles.title, styles.text]}> 목표량 </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={[styles.text, styles.data]}>
                {route.params.userinfo.goal}
              </Text>
              <Text
                style={[
                  styles.text,
                  {fontSize: 20, marginBottom: 10, marginLeft: 5},
                ]}>
                걸음
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.graphform}>
        <Text style={[styles.text, styles.titletext]}>주간 통계</Text>
        <Healthgraph />
      </View>
      <View style={styles.statsform}>
        <Text style={[styles.text, styles.titletext]}>유저간 상위 통계</Text>
        <View style={[styles.rec, {width: wd - 32, height: 180}]}>
          <Buttongroup />
        </View>
      </View>
      <View style={styles.rateform}>
        <Text style={[styles.text, styles.titletext]}>친구들의 건강정보</Text>
        <TouchableOpacity
          style={[styles.rec, {width: wd - 32, height: 80}]}></TouchableOpacity>
        <TouchableOpacity
          style={[styles.rec, {width: wd - 32, height: 80}]}></TouchableOpacity>
        <TouchableOpacity
          style={[styles.rec, {width: wd - 32, height: 80}]}></TouchableOpacity>
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
    fontSize: 55,
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
