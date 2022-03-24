import auth from '@react-native-firebase/auth';

export function signIn({email,password}) { //로그인
    return auth().signInWithEmailAndPassword(email,password);
}

export function signUp({email,password}) { //회원가입
    return auth().createUserWithEmailAndPassword(email,password);
}

export function subscribeAuth(callback) { //앱 가동시 or 로그인 상태가 변경될 때 현재 사용자의 정보를 파라미터로 받아오는 특정 콜백 함수를 등록하는 함수
    return auth().onAuthStateChanged(callback);
}

export function signOut() { //로그아웃
    return auth().signOut;
}

//https://rnfirebase.io/auth/usage  reactnative firebase 회원 인증에 대한 공식 문서
//파이어베이스에서 제공하는 함수들을 컴포넌트에 바로 사용하지 않고 임의의 함수를 만들어 호출하는 이유 : 추후에 다른 방식 (파이어베이스말고) 으로 인증할 때도 사용하면 편하니까.