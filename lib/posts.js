import firestore from '@react-native-firebase/firestore';

//데이터 등록할 때마다 새로운 아이디 생성 (등록 전에 id를 모르기에.)
const postsCollection = firestore().collection('posts');

export function createPost({user,photoURL,title,description}){
    return postsCollection.add({
        user,//usercontext에 담긴 사용자 정보
        photoURL,//업로드 이미지의 주소
        title,//제목
        description,//이미지 설명

        //데이터 등록 후 firestore 서버에서 해당 데이터 값을 다시 지정.
        //사용자 기준이 아닌 서버 기준의 시간으로 등록하기 위해 서버측에서 값 정하도록 설정
        createdAt: firestore.FieldValue.serverTimestamp(),
    });
}