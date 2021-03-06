import React,{useEffect} from "react";
import {useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useUserContext } from "../contexts/UserContext";
import {getPosts} from '../lib/posts';
import {getUser} from '../lib/users';

function Profile({userId}){
    const {user} =useUserContext();
    const [posts, setPosts] = useState(null);

 //   useEffect(()=>{
 //       getUser().then(setUser);
       // getPosts({userId}).then(setPosts);
 //   },[]);
    if (!user){
        return(
            <ActivityIndicator style = {styles.spinner} size={32} color="#6200ee"/>
        );
    }
    return(     
    <View style={styles.userInfo}>
        <Image 
            source={
                    user.photoURL
                        ? {
                            uri:user.photoURL,
                        }
                        :require('../assets/user.png')   
                    }
                    resizeMode="cover"
                    style={styles.avatar}
        />
        <Text style={styles.username}>{user.displayName}</Text>
                </View>
    );
}

const styles = StyleSheet.create({
    spinner:{
        flex:1,
        justifyContent:'center',
    },
    block:{
        flex:1,
    },
    userInfo:{
        paddingTop: 80,
        paddingBottom: 64,
        alignItems:'center',
    },
    avatar:{
        width: 128,
        height:128,
        borderRadius:64,
    },
    username: {
        marginTop:16,
        fontSize:24,
        color:'#bdbdbd',
    },
})
export default Profile;