import { useRoute,useNavigation } from "@react-navigation/native";
import React, {useEffect,useRef,useState,useCallback} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Animated,
    Keyboard,
    useWindowDimensions,
} from 'react-native';
import IconRightButton from "../components/IconRightButton";


function UploadScreen(){
    const route = useRoute();
    const {res} = route.params || {};
    const {width} = useWindowDimensions();
    const animation = useRef(new Animated.Value(width)).current;
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const navigation = useNavigation();
    const onSubmit = useCallback(()=> {
        //post 작성 로직 구현
    }, []);

    useEffect(() => {
        const didShow = Keyboard.addListener('keyboardDidShow', () =>
        setIsKeyboardOpen(true),
        );
        const didHide = Keyboard.addListener('keyboardDidHide', ()=>
        setIsKeyboardOpen(false),
        );

        return () => {
            didShow.remove();
            didHide.remove();
        }
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isKeyboardOpen ? 0 : width,
            useNativeDriver: false,
            duration:150,
            delay:100, //50ms 이후 애니메이션 시작(키보드 나타나는 시간과 겹치지 않게)
        }).start();
    },[isKeyboardOpen,width,animation]);

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onSubmit} name="done"/>,
        });
    }, [navigation,onSubmit]);
    return(
            <View style={styles.block}>              
                <Animated.Image
                    source={{uri: res.assets[0]?.uri}}
                    style={[styles.image,{height:animation}]}
                    resizeMode="cover"
                />
                <TextInput
                    placeholder="제목을 입력하세요"
                    style={styles.titleinput}
                    value={title}
                    onChangeText={setTitle}
                 />
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="이 사진에 대한 설명을 입력하세요..."
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
    );
}
/*                */

const styles=StyleSheet.create({
    block:{
        flex:1,
        backgroundColor: 'rgba(48,47,47,1)',
    },
    titleinput: {
        paddingHorizontal: 16,
        fontSize: 18,
        paddingBottom: 16,
        fontWeight: 'bold',
        color: "#bdbdbd",
      },
    image: {width: '100%'},
    input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom:16,
        flex:1,
        fontSize:16,
        color: "#bdbdbd",
    },
});
export default UploadScreen;