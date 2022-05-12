import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PostCard from '../components/PostCard';
import {useUserContext} from '../contexts/UserContext';
import {getPosts, PAGE_SIZE, getOlderPosts, getNewerPosts} from '../lib/posts';
function FeedScreen() {
  const {user, setUser} = useUserContext();
  const [posts, setPosts] = useState(null);
  // 마지막 포스트까지 조회했음을 명시하는 상태ㅐ
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const followingid = user.followingid;
  useEffect(() => {
    //컴포넌트가 처음 마운트될 때(화면을 보여주는 시점에서)
    //포스트 목록 조회 후 'posts' 상태에 담기
    getPosts(followingid).then(setPosts);
  }, []);

  //밑으로 스크롤 해서 더이상 나올게 없을 떄 호출
  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id, followingid);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };
  console.log(posts);

  //새로운 포스트 조회
  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }
    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id, followingid);
    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  };

  if (!posts) {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>로딩중 !!</Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>피드가 없어요 !!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="#bdbdbd" />
        )
      }
      refreshControl={
        //onRefresh => 화면의 맨 위에서 아래로 끌어당겼을 때 호출

        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

//rendering할때마다 매번 만드는 것보다 한번 만들고 재사용 하는 것 이 성능면에서 좋아서 컴포넌트 밖에 선언.
const renderItem = ({item}) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
    title={item.title}
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
  text: {
    fontFamily: 'roboto-regula',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  box: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedScreen;
