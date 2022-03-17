import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import BorderedInput from "../components/BorderedInput";
import CustomButton from "../components/CustomButton";

function SignInScreen() {
    return(
        <SafeAreaView style={styles.fullscreen}>
            <Text style={styles.text}>For You</Text>
            <View style={styles.form}>
                <BorderedInput hasMarginBottom placeholder="아이디"/>
                <BorderedInput placeholder ="비밀번호" />
                <View style={styles.buttons}>
                    <CustomButton title="로그인" hasMarginButtom/>
                    <CustomButton title="회원가입" theme="secondary"/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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