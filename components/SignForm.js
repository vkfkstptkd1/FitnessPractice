// SignScreen에서 인풋

import React, {useRef} from "react";
import BorderedInput from "./BorderedInput";


function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}){
    
    //keyboard return을 위한 함수
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    return (
        <>
        <BorderedInput placeholder="이메일" 
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
        </>
    );
}
export default SignForm;