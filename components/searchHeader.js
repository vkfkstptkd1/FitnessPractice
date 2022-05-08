import React from 'react';
import { StyleSheet,Text } from 'react-native';

function SearchHeader(){
    return <Text style={styles.block}>hi</Text>
}

const styles= StyleSheet.create({
    block: {
        color: 'white',
        backgroundcolor: 'black'
    }
})

export default SearchHeader;