//사용자가 프로필 사진과 닉네임을 입력할 수 있게 하는 컴포넌트
//uid값을 라우터 파라미터로 넣어서 Welcome화면을 열어줌.
//이 uid 값은 회원 정보를 입력한 후 다음 버튼을 누를 때 createUser함수의 파라미터로 들어감.
// 여기서도 로딩처리를 해야함. 
import { useNavigation,useRoute } from "@react-navigation/native";
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from "./CustomButton";

function SetupProfile(){
    const [displayName, setDisplayName] = useState('');

    const navigation = useNavigation();
    const {params} = useRoute();
    const {uid} = params || {};

    const onSubmit = () => {
        createUser({
            id: uid,
            displayName,
            photoURL: null,
        });
    };
    const onCancel = () => {
        signOut();
        navigation.goBack();
    };

    return (
        <View style={styles.block}>
            <View style={styles.circle} />
            <View style={styles.form}>
                <BorderedInput
                    placeholder="닉네임"
                    value={displayName}
                    onChangeText={setDisplayName}
                    onSubmitEditing={onSubmit}
                    returnKeyType="next"
                />
                <View style={styles.buttons}>
                    <CustomButton 
                        title="다음"
                        onPress={onSubmit}
                        hasMarginButtom
                    />
                    <CustomButton
                        title="취소"
                        onPress={onCancel}
                        theme="secondary"
                    />
                </View>
            </View>           
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems:'center',
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
    buttons:{
        marginTop: 48,
    },
});

export default SetupProfile;