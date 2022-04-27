import React,{useState} from 'react';
import { ActionSheetIOS,View, Pressable, StyleSheet, Platform} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModeModal from './UploadModeModal';

const TABBAR_HEIGHT = 49;

const imagePickerOption={
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
};

function CameraButton(){
    const [modalVisible,setModalVisible]=useState(false);
    const insets=useSafeAreaInsets(); // 하단 여백 크기 알게 함.

    const bottom = TABBAR_HEIGHT;

    const onPickImage =(res) => {
        if (res.didCance || !res) {
            return;
        }
        console.log(res);
    };

    const onLaunchCamera = () => {
        launchCamera(imagePickerOption, onPickImage);
    };

    const onLaunchImageLibrary = () =>{
        launchImageLibrary(imagePickerOption,onPickImage);
    };


    const onPress = () => {
        if (Platform.OS ==='android')
        {
        setModalVisible(true);
        return;
        }
    
        ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['카메라로 촬영하기','사진 선택하기','취소'],
          cancelButtonIndex:2,
        },
        (buttonIndex)=>{
          if (buttonIndex === 0){
            onLaunchCamera();
            //console.log("카메라 촬영");
          } else if (buttonIndex === 1){
            onLaunchImageLibrary();
            //console.log('사진 선택');
          }
        },
        ); 
      };
    
    return(
    <>
    <View style={[styles.wrapper,{bottom}]}>
        <Pressable
            android_ripple={{
                color: '#ffffff',
            }}
            style={styles.circle}
            onPress={onPress}>
            <Icon name="camera-alt" color="white" size={24}/>
        </Pressable>
    </View>
    <UploadModeModal
      visible={modalVisible}
      onClose={()=> setModalVisible(false)}
      onLaunchCamera={onLaunchCamera}
      onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
    );
}

const styles= StyleSheet.create({
    wrapper: {
        zIndex: 5,
        borderRadius:27,
        height: 54,
        width: 54,
        position: 'absolute',
        left: '50%',
        transform:[
        {
            translateX: -27,
        },
        ],
        ...Platform.select({
        ios: {
            shadowColor: '#ffffff',
            shadowOffset:{width:0,height:4},
            shadowOpacity: 0.3,
            shadowRadius: 4,
        },
        andorid:{
            elevation:5,
            overflow:'hidden',
        },
    }),
    },
    circle: {
        backgroundColor: "#bdbdbd",
        borderRadius: 27,
        height: 54,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CameraButton;