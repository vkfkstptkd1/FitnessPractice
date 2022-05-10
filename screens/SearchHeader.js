import React, { useContext } from "react";
import { StyleSheet,View,useWindowDimensions, Pressable,Keyboard } from "react-native";
import BorderedInput from "../components/BorderedInput";
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchContext from "../contexts/SearchContext";

function SearchHeader(){
    const {width}=useWindowDimensions();
    const {keyword,onChangeText}=useContext(SearchContext);
    const onPress = () => {
        Keyboard.dismiss()
      }
    return (
    <View style={[styles.block,{width:width-32}]}>
        <View style={styles.input}>
        <BorderedInput 
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChangeText={onChangeText}
            onSubmitEditing={onPress}
        />
        </View> 
        <Pressable 
            style={({pressed}) => [styles.button,pressed && {opacity:0.5}]}
            onPress={onPress}
            >
            <Icon name="search" size={20} color="#bdbdbd"/>
        </Pressable>
    </View>
    )
}

const styles=StyleSheet.create({
    block:{
        color:'#4A4A4a',  
        flexDirection: 'row',
        alignItems:'center',
        margin:16,
    },
    button:{
         marginLeft: 8,
         //justifyContent:'center',
    },
    input:{
        flex:1
    }
})

export default SearchHeader;