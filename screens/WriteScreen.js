import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

function GraphScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleinput}
        returnKeyType="next"
        placeholderTextColor={'white'}
      />
      <TextInput
        placeholder="운동 내용을 기록해보세요"
        style={styles.bodyinput}
        multiline
        textAlignVertical="top"
        placeholderTextColor={'white'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(48,47,47,1)',
    padding: 16,
  },
  titleinput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  bodyinput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: 'white',
  },
});

export default GraphScreen;
