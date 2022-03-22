import React, {useRef,useState} from "react";
import {
        Keyboard,
        KeyboardAvoidingView,
        Platform,
        StyleSheet,
        Text,
        View,} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import BorderedInput from "../components/BorderedInput";
import CustomButton from "../components/CustomButton";

function SignInScreen({navigation,route}) {
    const {isSignUp} = route.params ?? {}; // 라우트는 이 값에 의해 화면전환 가능하게
                    //화면에 파라미터가 지정되어 있지 않다면 route.params 값 = undefined
                    //undefined값에 객체 구조 분해 할당을 하려고 하면 에러 발생.
                    //만약 해당 값이 undefined라면 비어있는 객체에서 구조분해 할당을 해 에러가 발생하지 않도록 처리해준 것
    const [form, setForm] =useState({ // 프로젝트의 큰 객체같은 느낌.
        email: '',
        password: '',
        confirmPassword: '',
    });

    const createChangeTextHandler = (name) => (value) => { //이 문법 잘 모르겟음 하여튼 그 인풋에 있는 텍스트를 form에다 저장하는거인듯?
        setForm({...form, [name]:value});//form객체에서 원하는 키를 반환
    };

    const onSubmit = () => { //keyboard 사라지게
        Keyboard.dismiss();
        console.log(form);
    };

    //키보드 리턴을 위한 함수 설정.
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    
    return(
        <KeyboardAvoidingView 
          style={styles.KeyboardAvoidingView}
          behavior={Platform.select({ios: 'padding'})}>                  
            <SafeAreaView style={styles.fullscreen}>
                <Text style={styles.text}>For You</Text>
                <View style={styles.form}>
                    <BorderedInput placeholder="아이디" 
                                   hasMarginBottom
                                   value={form.email}
                                   onChangeText={createChangeTextHandler('email')}
                                   autoCapitalize="none"        //첫번째 자동대문자
                                   autoCorrect={false}          //자동 수정 비활서오하
                                   autoCompleteType="email"     //이메일 자동 완성
                                   keyboardType="email-address" //이메일 전용 키보드 활성화
                                   
                                   //input keyboard return 처리
                                   returnkeyType="next"
                                   onSubmitEditing={() => passwordRef.current.focus()}
                   />
                    <BorderedInput placeholder ="비밀번호"
                                   hasMarginBottom={isSignUp}
                                   value={form.password}
                                   onChangeText={createChangeTextHandler('password')}
                                   secureTextEntry      //비밀번호 입력 시 화면에서 숨겨짐

                                   //
                                   ref={passwordRef}
                                   returnkeyType={isSignUp ? 'next' : 'done'}
                                   onSubmitEditing={() => {
                                       if (isSignUp) {
                                           confirmPasswordRef.current.focus();
                                         } else {
                                            onSubmit();
                                         }
                                       }
                                   }
                    />
                    {isSignUp && (
                    <BorderedInput placeholder ="비밀번호 확인" 
                                   value={form.confirmPassword}
                                   onChangeText={createChangeTextHandler('confirmPassword')}
                                   secureTextEntry

                                   //
                                   ref={confirmPasswordRef}
                                   returnkeyType="done"
                                   onSubmitEditing={onSubmit}
                    />)
                    }
                    <View style={styles.buttons}>
                        {isSignUp ? ( // 회원가입 페이지인가 ?
                            <>
                            <CustomButton title="회원가입" 
                                        hasMarginButtom
                                        onPress={onSubmit}
                                        />
                            <CustomButton title="로그인" theme="secondary" 
                                            onPress={()=>{
                                            navigation.goBack();
                                            }}
                            />
                            </>
                            ) : (
                            <>
                            <CustomButton title="로그인" 
                                          hasMarginButtom
                                          onPress={onSubmit}
                            />
                            <CustomButton title="회원가입"  //회원가입 누를 경우 issignup true로 바꿔서 회원가입 화면으로 전환 (버튼 순서 바꿈 + input 추가)
                                            theme="secondary"
                                            onPress={()=> {
                                            navigation.push('SignIn',{isSignUp:true}); //SignIn이 머지
                                            }}
                            />
                            </>
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    KeyboardAvoidingView:{
        flex:1,
    },
    fullscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color:'#bdbdbd',
    },
    form: {
        marginTop: 64,
        width: '100%',
        paddingHorizontal:16,
    },
    buttons: {
        marginTop: 64,
    }
});

export default SignInScreen;