import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

function Healthgraph() {
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];

  function renderTitle() {
    return (
      <View style={styles.container}>
        <View style={styles.titleform}>
          <View style={[styles.circle, {backgroundColor: '#177AD5'}]} />
          <Text style={styles.text}>목표량</Text>
        </View>
        <View style={styles.titleform}>
          <View style={[styles.circle, {backgroundColor: '#ED6665'}]} />
          <Text style={styles.text}>달성량</Text>
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
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{color: 'gray'}}
        noOfSections={3}
        maxValue={75}
        isAnimated
      />
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
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
