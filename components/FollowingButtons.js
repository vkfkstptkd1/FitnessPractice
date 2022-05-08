import React from'react';
import {ActivityIndicator,StyleSheet,View}from'react-native';
import CustomButton from'../components/CustomButton';

function FollowingButtons({isFriend,onSubmit,Loading}) {

    const Title = isFriend ? '친구끊기' : '친구맺기';
    const Theme = isFriend ? 'secondary' : 'primary';

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
            <CustomButton title={Title}
                          theme={Theme}
                          onPress={onSubmit} />
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

export default FollowingButtons;