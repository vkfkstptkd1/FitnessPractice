import React,{useMemo} from "react";
import {View, StyleSheet,Text,Image,Pressable} from 'react-native';
import CustomButton from "./CustomButton";
function PostCard({user,title,photoURL,description,createdAt,id}){
    const date =useMemo(
        ()=> (createdAt ? new Date(createdAt._seconds * 1000) : newDate()),
        [createdAt],
    );
    const onOpenProfile=()=>{
        //사용자 프로필 화면 열기
    }
    const onSubmit = async () => {
    }

    return(
        <View style={styles.block}>
            <View style={[styles.head, styles.paddingBlock]}>
                <Pressable style={styles.profile} onPress={onOpenProfile}>
                    <Image source={
                        user.photoURL
                            ? {
                                uri:user.photoURL,
                            }
                        :require('../assets/user.png')
                    }
                    resizeMode="cover"
                    style={styles.avatar}
                />
                <Text style={styles.displayName}>{user.displayName}</Text>
                </Pressable>
            </View>
            <Image
                source={{uri:photoURL}}
                style={styles.image}
                resizeMethod="resize"
                resizeMode="cover"
                />
            <View style={styles.paddingBlock}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text date={date} style={styles.date}>
                    {date.toLocaleString()}
                </Text>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    block:{
        paddingTop: 16,
        paddingBottom:16,
        borderColor:'#bdbdbd',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius:16,
    },
    paddingBlock: {
        paddingHorizontal: 16,
    },
    head:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:16,
    },
    profile:{
        flexDirection: 'row',
        alignItems:'center',
    },
    displayName:{
        color:'white',
        lineHeight:16,
        fontSize:16,
        marginLeft:8,
        fontWeight:'bold',
    },
    image: {
        backgroundColor: '#bdbdbd',
        width: '100%',
        aspectRatio: 1,
        marginBottom:16,
    },
    title:{
        color:'white',
        fontSize:24,
        lineHeight:24,
        marginBottom: 8,
    },
    description:{
        color:'white',
        fontSize:16,
        lineHeight:24,
        marginBottom: 8,
        borderColor:"#bdbdbd"
    },
    date: {
        color: '#757575',
        fontSize:12,
        lineHeight:18,
    },
})

export default PostCard;