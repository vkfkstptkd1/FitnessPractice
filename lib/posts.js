import firestore from '@react-native-firebase/firestore';

//데이터 등록할 때마다 새로운 아이디 생성 (등록 전에 id를 모르기에.)
const postsCollection = firestore().collection('posts');

//컴포넌트에서 포스트 목록을 끝까지 불러왔는지 확인하기 위해 이 값을 참조하므로 이 값을 export
export const PAGE_SIZE = 3;

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

export async function getPosts(userId) {
    let query = postsCollection.orderBy('createdAt','desc').limit(PAGE_SIZE);
    if (userId){
        query = query.where('user.id','==',userId);
    }
    const snapshot = await query.get();
        //.orderBy('createdAt','desc')    //orderby -> 특정 속성으로 정렬, 첫번째 파라미터는 ㄴ속성 이름, 두번쩨파라미터는 'desc'(내림차순) 'asc'(오름차순)
        //.limit(PAGE_SIZE) // 불러오는 포스트 수 제한.
        //.get();

    //고유 아이디 넣어줌.
    const posts = snapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data(),
    }));
    return posts;
}

//특정 포스트 이전에 작성한 포스트를 불러오는 getOldefPosts 구현
export async function getOlderPosts(id,userId) {
    const cursorDoc = await postsCollection.doc(id).get();
    let query=postsCollection
        .orderBy('createdAt','desc')
        .startAfter(cursorDoc)
        .limit(PAGE_SIZE);
        if(userId){//userid가 존재하면 
            query=query.where('user.id','==',userId);
        }
    const snapshot = await query.get();
       // .orderBy('createdAt','desc')
       // .startAfter(cursorDoc)//파라미터로 받은 정보를 제외한 데이터 반환, 숫자 또는 문서를 인자로 넣어주고 문서를 넣어줄 경우 해당 문서 다음의 데이터가 반환. 숫자일 경우 조회할 결과의 n번째 문서 이후의 데이터 반환, 현재상황에선 문서값이 적합한 게 담페이지 불러오는 사이에 새로운 포스트가 작성될 수 있기 때문. 
       // .limit(PAGE_SIZE)
    
        const posts = snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        return posts;
}

//최근 작성한 포스트 불러오기

export async function getNewerPosts(id) {
    const cursorDoc= await postsCollection.doc(id).get();
    let query=postsCollection //let으로 query미리 선언, 만약 userId가 존재하면 where함수 사용.
    .orderBy('createdAt','desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);
    if(userId){//userid가 존재하면 
        query=query.where('user.id','==',userId);
    }
    const snapshot = await query.get();
        //.orderBy('createdAt','desc')
        //.endBefore(cursorDoc) // 특정 문서 이전 문서들 조회, 파라미터로 받은 문서의 정보 포함 x endAt은 포함
        //.limit(PAGE_SIZE)

    const posts= snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    }));

    return posts;
}