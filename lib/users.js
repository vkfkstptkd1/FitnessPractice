//users라는 컬렉션에 사용자 정보가 담긴 문서
import firestore from '@react-native-firebase/firestore';

//컬렉션 레퍼런스
//컬렉션에 있는 특정 값을 조회, 등록, 삭제하는 메서드.
export const usersCollection = firestore().collection('users');

//주어진 파라미터를 고유 id로 가지고 있는 문서에 주어진 정보들 설정 후 저장.
export function createUser({id, displayName, photoURL, userinfo}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
    userinfo,
  });
}

//주어진 파라미터를 고유 id로 가지고 있는 문서 조회
export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
