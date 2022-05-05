import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//import BorderedInput from "../components/BorderedInput";
//import CustomButton from "../components/CustomButton";
import {signIn, signUp} from '../lib/auth';

import SignForm from '../components/SignForm';
import SignButtons from '../components/SignButtons';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params || {}; // 라우트는 이 값에 의해 화면전환 가능하게
  //화면에 파라미터가 지정되어 있지 않다면 route.params 값 = undefined
  //undefined값에 객체 구조 분해 할당을 하려고 하면 에러 발생.
  //만약 해당 값이 undefined라면 비어있는 객체에서 구조분해 할당을 해 에러가 발생하지 않도록 처리해준 것
  const [Loading, setLoading] = useState();
  const {setUser} = useUserContext();
  const [form, setForm] = useState({
    // 프로젝트의 큰 객체같은 느낌.
    email: '',
    password: '',
    confirmPassword: '',
  });

  const createChangeTextHandler = name => value => {
    //이 문법 잘 모르겟음 하여튼 그 인풋에 있는 텍스트를 form에다 저장하는거인듯?
    setForm({...form, [name]: value}); //form객체에서 원하는 키를 반환
  };

  const onSubmit = async () => {
    //버튼 누른 경우

    //keyboard 사라지게
    Keyboard.dismiss();

    //firebase 회원 인증 부분
    //issign값에 따라 signup 또는 signin함수 호출
    //이 함수들은 promise를 반환. -> async/await문법 사용해 작업이 끝날 때까지 기다렸다가 특정 작업 수행가능
    //처음 호출될 때는 loading상태 true, 작업이 끝나면 loading상태를 false

    const {email, password, confirmPassword} = form;

    //오류 예외 처리
    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다. ');
      console.log({password, confirmPassword});
      return;
    }

    setLoading(true); //작업 시작 호출
    const info = {email, password};
    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      const profile = await getUser(user.uid);
      console.log(profile);
      if (!profile) {
        navigation.navigate('Welcome', {uid: user.uid});
      } else {
        setUser(profile);
        console.log(profile);
      }
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일 입니다.',
        'auth/wrong-password': '잘못된 비밀번호 입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      console.log(e);
      const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 오류`;
      Alert.alert('오류', msg);

      setLoading(false); //작업 종료 호출
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Image style={styles.image} source={require('../assets/Logo_.png')} />
        <Text style={styles.text}>For U</Text>
        <View style={styles.form1}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={Loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  form1: {
    width: '100%',
    paddingHorizontal: 16,
  },
  image: {
    marginBottom: 3,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 48,
    color: 'white',
    marginBottom: 16,
  },
});

export default SignInScreen;
