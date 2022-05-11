import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import Recentprofilecard from '../components/Recentprofilecard'
import {getPosts} from '../lib/posts';
import { useUserContext } from '../contexts/UserContext';
function RecentFriendScreen() {
  const {user, setUser} = useUserContext();
  const [posts, setPosts] = useState(null);
  // 마지막 포스트까지 조회했음을 명시하는 상태ㅐ
  const followingid = user.followingid;
  useEffect(() => {
    //컴포넌트가 처음 마운트될 때(화면을 보여주는 시점에서)
    //포스트 목록 조회 후 'posts' 상태에 담기
    getPosts(followingid).then(setPosts);
    console.log(followingid);
  }, []);

  //밑으로 스크롤 해서 더이상 나올게 없을 떄 호출
 
  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
     // contentContainerStyle={styles.container}
     // onEndReachedThreshold={0.75}
    />
  );
}

//rendering할때마다 매번 만드는 것보다 한번 만들고 재사용 하는 것 이 성능면에서 좋아서 컴포넌트 밖에 선언.
const renderItem = ({item}) => (
  <Recentprofilecard
    createdAt={item.createdAt}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
   // title={item.title}
    result={item.result}
    locations={item.locations}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    backgroundColor: 'rgba(48,47,47,1)',
  },
  spinner: {
    //height: 64,
  },
});

export default RecentFriendScreen;
