/*import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function GraphScreen() {
  const [uri, setUri] = useState([]);
  const onSelectImage = () => {
    if (uri.length == 3) {
      alert('더이상 고를 수 없습니다!');
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 90,
        maxHeight: 90,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setUri([...uri, res]);
      },
    );
  };

  const children = uri.map(i => (
    <Image style={styles.imagepick} source={{uri: uri[i]?.assets[0]?.uri}} />
  ));

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleinput}
        returnKeyType="next"
        placeholderTextColor={'white'}
      />
      <View style={styles.imageform}>
        <Pressable style={styles.imagepick} onPress={onSelectImage}>
          <Icon name={'add'} size={40} style={styles.icon} />
        </Pressable>
        {children}
      </View>
      <TextInput
        placeholder="이 사진에 대한 설명을 기록하세요.."
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
  imageform: {
    flexDirection: 'row',
  },
  imagepick: {
    height: 90,
    width: 90,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default GraphScreen;
*/