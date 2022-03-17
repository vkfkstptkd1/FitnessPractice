import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

function CustomButton({onPress, title, hasMarginButtom,theme}){
    
    const isPrimary = theme === 'primary'; //primary button (기본)

    return(
        <View style={[styles.block,hasMarginButtom && styles.margin]}>
            <Pressable
                onPress={onPress}
                style={({pressed}) => [
                    styles.wrapper,
                    isPrimary ? styles.primaryWrapper : styles.secondaryWrapper,
                    Platform.OS === 'ios' && pressed && {opacity: 0.5},
                ]}
            android_ripple={{
                color: isPrimary ? '#ffffff' : 'bdbdbd',
            }}>
            <Text style={[
                styles.text,
                isPrimary ? styles.primaryText : styles.secondaryText,
                ]}>
                {title}
            </Text>
            </Pressable>
        </View>
    );
}

CustomButton.defaultProps = {
    theme: 'primary',
}

const styles = StyleSheet.create({
    overflow: {
        borderRadius: 4,
        overflow: 'hidden',
    },
    wrapper: {
        borderRadius:4,
        height: 48,
        overflow: 'hidden',
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor: '#302f2f',
        opacity: 1,
    },
    primaryWrapper: {
        backgroundColor: '#302f2f',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#bdbdbd',
    },
    primaryText: {
        color:'#bdbdbd',
    },
    secondaryText: {
        color: '#302f2f'
    },
    secondaryWrapper: {
        backgroundColor: '#bdbdbd',
    },
    margin: {
        marginBottom: 8,
    },
});

export default CustomButton;