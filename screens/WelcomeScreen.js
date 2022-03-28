import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SetupProfile from '../components/SetupProfile';

function WelcomeScreen(){
    return(
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.select({ios: 'padding'})}>
            <SafeAreaView style={styles.block}>
                <Text style={styles.title}>For U</Text>
                <Text style={styles.description}>프로필을 설정하세요.</Text>
                <SetupProfile/>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles=StyleSheet.create({
    keyboardAvoidingView: {
        flex:1,
    },
    block: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000000'
    },
    title: {
        color:'#bdbdbd',
        fontSize: 48,
    },
    description:{
        marginTop:16,
        fontSize:21,
        color: '#bdbdbd',
    },
});

export default WelcomeScreen;

