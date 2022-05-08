import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActionSheetIOS,
  View,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import UploadModeModal from './UploadModeModal';

const TABBAR_HEIGHT = 49;

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

function CameraButton(props) {
  console.log(props.locations);
  const [modalVisible, setModalVisible] = useState(false);
  // const insets=useSafeAreaInsets(); // 하단 여백 크기 알게 함.
  const navigation = useNavigation(); //Uploadscreen에 res라우트 파라미터 전달.
  //const bottom = TABBAR_HEIGHT;

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push(props.text, {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const onPress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          onLaunchCamera();
          //console.log("카메라 촬영");
        } else if (buttonIndex === 1) {
          onLaunchImageLibrary();
          //console.log('사진 선택');
        }
      },
    );
  };

  return (
    <>
      <View style={[styles.wrapper]}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            Platform.OS === 'ios' && {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          android_ripple={{
            color: 'white',
          }}
          onPress={onPress}>
          <Icon name={props.icon} style={styles.icon} size={24} />
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default CameraButton;
