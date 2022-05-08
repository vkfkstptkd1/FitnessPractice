//users라는 컬렉션에 사용자 정보가 담긴 문서
import firestore from '@react-native-firebase/firestore';

//컬렉션 레퍼런스
//컬렉션에 있는 특정 값을 조회, 등록, 삭제하는 메서드.
export const usersCollection = firestore().collection('users');
export const LIST_SIZE= 6;

//주어진 파라미터를 고유 id로 가지고 있는 문서에 주어진 정보들 설정 후 저장.
export function createUser({id, displayName, photoURL, userinfo}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
    userinfo,
    followingid,
    followerid,
  });
}

//주어진 파라미터를 고유 id로 가지고 있는 문서 조회
export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}

export async function getUserProfile(userId) {
  //let query = usersCollection.orderBy('displayName','desc').limit(LIST_SIZE);
  //  if (userId){
  //      query = query.where('user.id','==',userId);
  //  }
  //  const snapshot = await query.get();
        //.orderBy('createdAt','desc')    //orderby -> 특정 속성으로 정렬, 첫번째 파라미터는 ㄴ속성 이름, 두번쩨파라미터는 'desc'(내림차순) 'asc'(오름차순)
        //.limit(PAGE_SIZE) // 불러오는 포스트 수 제한.
        //.get();

    //고유 아이디 넣어줌.
    const snapshot = await usersCollection.get();
    const users = snapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data(),
    }));
    return users;
}