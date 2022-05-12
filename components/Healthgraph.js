import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {useUserContext} from '../contexts/UserContext';

function Healthgraph(route) {
  const {achieveinfo} = useUserContext();
  //console.log(achieveinfo);
  let achieve = 0;

  switch (route.format) {
    case '걸음':
      achieve = achieveinfo.step;
      break;
    case '미터':
      achieve = achieveinfo.dist;
      break;
    case 'kcal':
      achieve = achieveinfo.kcal;
      break;
    case '분':
      achieve = achieveinfo.Htime;
      break;
  }

  const barData = [
    {
      value: route.weekinfo[0].value,
      label: route.weekinfo[0].day,
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
    {
      value: route.weekinfo[1].value,
      label: route.weekinfo[1].day,
      spacing: 2,
      labelWidth: 31,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
    {
      value: route.weekinfo[2].value,
      label: route.weekinfo[2].day,
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
    {
      value: route.weekinfo[3].value,
      label: route.weekinfo[3].day,
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
    {
      value: route.weekinfo[4].value,
      label: route.weekinfo[4].day,
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
    {
      value: route.weekinfo[5].value,
      label: route.weekinfo[5].day,
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
    {
      value: route.weekinfo[6].value,
      label: route.weekinfo[6].day,
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: achieve, frontColor: '#ED6665'},
  ];

  function renderTitle() {
    return (
      <View style={styles.container}>
        <View style={styles.titleform}>
          <View style={[styles.circle, {backgroundColor: '#177AD5'}]} />
          <Text style={styles.text}>달성량</Text>
        </View>
        <View style={styles.titleform}>
          <View style={[styles.circle, {backgroundColor: '#ED6665'}]} />
          <Text style={styles.text}>목표랑</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.maincontainer}>
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        yAxisLabelWidth={38}
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{color: 'gray'}}
        noOfSections={3}
        maxValue={route.max}
        isAnimated
      />
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'rgba(48,47,47,1)',
    paddingBottom: 40,
    borderRadius: 10,
    margin: 6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  titleform: {flexDirection: 'row', alignItems: 'center'},
  circle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  text: {
    width: 60,
    color: 'white',
  },
});

export default Healthgraph;
