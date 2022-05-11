import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const wd = Dimensions.get('window').width;

function RecommendForm(props) {
  if (!props.posts) {
    return <View> </View>;
  }

  const navigation = useNavigation();
  const locations = props.posts.locations;
  const URL = props.posts.photoURL;

  const onPress = () => {
    navigation.push('RecommendMap', locations);
  };

  return (
    <View style={styles.recommend}>
      <View
        style={styles.top_touch}
        onPress={() => navigation.push('Recommend')}>
        <Text style={styles.title}>추천 운동 스팟</Text>
        <View style={styles.topform}>
          <Image style={styles.image} source={{uri: URL}} />
          <View style={styles.textgroup}>
            <Text style={styles.rec_title}>제목: {props.posts.title}</Text>
            <Text style={styles.rec_text}>- 운동 정보 - </Text>
            <Text style={styles.rec_text}>
              예상 걸음수 : {props.posts.result} 걸음
            </Text>
            <Text style={styles.rec_text}>
              소모칼로리 : {parseInt(parseInt(props.posts.result * 1) / 30)}{' '}
              Kcal
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <TouchableOpacity style={styles.bottom_touch} onPress={onPress}>
        <Text style={styles.more}> 지도 보기</Text>
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
