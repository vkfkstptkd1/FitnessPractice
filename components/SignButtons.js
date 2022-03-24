//signscreen에 쓰이는 버튼들

import React from'react';
import {ActivityIndicator,StyleSheet,View}from'react-native';
import CustomButton from'../components/CustomButton';
import {useNavigation} from'@react-navigation/native';

function SignButtons({isSignUp, onSubmit, Loading}) {
    const navigation = useNavigation();

    const primaryTitle = isSignUp ? '회원가입' : '로그인';
    const secondaryTitle = isSignUp ? '로그인' : '회원가입';

    const onSecondaryButtonPress = () => {
        if (isSignUp) {
            navigation.goBack();
        } else {
            navigation.push('SignIn',{isSignUp: true});
        }
    };
    if (Loading) {
        return (
            //버트 눌렀을 때 loading
            <View style={styles.spinnerWrapper}>
                <ActivityIndicator size={32} color="#000000"/>
            </View>
        )
    }
    return(
        <View style={styles.buttons}>
            <CustomButton title={primaryTitle}
                          hasMarginButtom
                          onPress={onSubmit} />
            <CustomButton title={secondaryTitle}
                          theme="secondary"
                          onPress={onSecondaryButtonPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 64,
    },
    spinnerWrapper: {
        marginTop: 64,
        height: 104,
        justifyContent: 'center',
        alignItems: 'center,'
    },
});

export default SignButtons;