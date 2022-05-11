//사용자가 프로필 사진과 닉네임을 입력할 수 있게 하는 컴포넌트
//uid값을 라우터 파라미터로 넣어서 Welcome화면을 열어줌.
//이 uid 값은 회원 정보를 입력한 후 다음 버튼을 누를 때 createUser함수의 파라미터로 들어감.
// 여기서도 로딩처리를 해야함.
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext(); // login시 프로필 존재하면 setUser호출
  const {params} = useRoute();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const {uid} = params || {};

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      const asset = response.assets[0];
      const extension = asset.fileName.split('.').pop(); // 확장자 추출
      const reference = storage().ref(`/profile/${uid}.${extension}`); // 업로드할 경로 지정

      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri); //파일저장(uri: 선택한 이미지의 로컬 경로)
      }
      // 다운로드할 수 있는(또는 image를 통해 보여줄 수 잇는 )url 생성
      photoURL = response ? await reference.getDownloadURL() : null;
    }
    const user = {
      id: uid,
      displayName,
      photoURL,
      userinfo: {},
      achieveinfo: {
        step: 3000,
        dist: 2500,
        kcal: 150,
        Htime: 30,
      },
      followingid: [displayName],
    };
    createUser(user);
    setUser(user);
  };
  const onCancel = () => {
    signOut();
    navigation.goBack();
  };
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', //photo or video
        maxWidth: 512, //image 가로폭 리사이즈
        maxHeight: 512, //image 세로폭 리사이즈
        includeBase64: Platform.OS === 'android', //안드로이드의 경우에만 이미지를 base64 형식으로 인코딩, 추후 업로드할때 uri에서 직접 파일을 읽는 과정에서 권한 오류가 발생할 수 있기 때문. (이권한이슈는 google photo를 사용하는 기기에서 발생.)
      },
      res => {
        if (res.didCancel) {
          //취소
          return;
        }
        setResponse(res);
        console.log(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={
            response
              ? {uri: response?.assets[0]?.uri}
              : require('../assets/user.png')
          }
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <ActivityIndicator size={32} color="#bdbdbd" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginButtom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,

    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#bdbdbd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 24,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
