import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';

const wd = Dimensions.get('window').width;

function RecommendForm() {
  // onPress 등 함수 and 운동데이터 추가 예정
  return (
    <View style={styles.recommend}>
      <TouchableOpacity style={styles.top_touch}>
        <Text style={styles.title}>추천 운동 스팟</Text>
        <View style={styles.topform}>
          <View style={styles.image}></View>
          <View style={styles.textgroup}>
            <Text style={styles.rec_title}>중앙 공원 산책</Text>
            <Text style={styles.rec_text}>예상 걸음수 : 1400</Text>
            <Text style={styles.rec_text}>소모칼로리 : 1521</Text>
            <Text style={styles.rec_text}>위치 정보 : 약 1.4km</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.bottom_touch}>
        <Text style={styles.more}> 더보기 ...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recommend: {
    flex: 1,
  },
  top_touch: {
    marginHorizontal: '5%',
    backgroundColor: 'rgba(48,47,47,1)',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  title: {
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '3%',
    marginLeft: '5%',
  },
  topform: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  image: {
    width: '45%',

    backgroundColor: '#E6E6E6',
    borderRadius: 14,
  },
  textgroup: {
    width: '50%',
    marginLeft: '4%',
  },
  rec_title: {
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontWeight: 'bold',
    marginBottom: '20%',
  },
  rec_text: {
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontWeight: 'bold',
    marginBottom: '4%',
  },
  line: {
    height: 4,
    marginHorizontal: '5%',
    backgroundColor: 'rgba(35,35,35,1)',
  },
  bottom_touch: {
    marginHorizontal: '5%',
    borderBottomRightRadius: 17,
    borderBottomLeftRadius: 17,
    backgroundColor: 'rgba(48,47,47,1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  more: {
    marginVertical: 15,
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontWeight: 'bold',
  },
});

export default RecommendForm;
