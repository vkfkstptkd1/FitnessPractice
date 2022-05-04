import React,{useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import PostCard from '../components/PostCard';
import { getPosts,PAGE_SIZE,getOlderPosts,getNewerPosts } from '../lib/posts';

function FeedScreen() {
    const [posts,setPosts] = useState(null);
    // 마지막 포스트까지 조회했음을 명시하는 상태ㅐ
    const [noMorePost, setNoMorePost] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    
    useEffect(()=>{
        //컴포넌트가 처음 마운트될 때(화면을 보여주는 시점에서) 
        //포스트 목록 조회 후 'posts' 상태에 담기
        getPosts().then(setPosts);
    }, []);

    //밑으로 스크롤 해서 더이상 나올게 없을 떄 호출
    const onLoadMore = async() =>{
        if (noMorePost || !posts || posts.length < PAGE_SIZE){
            return;
        }
        const lastPost = posts[posts.length-1];
        const olderPosts = await getOlderPosts(lastPost.id);
        if (olderPosts.length<PAGE_SIZE){
            setNoMorePost(true);
        }
        setPosts(posts.concat(olderPosts));
    }

    //새로운 포스트 조회
    const onRefresh = async() => { 
        if (!posts || posts.length ===0 || refreshing){
            return;
        }
        const firstPost = posts[0];
        setRefreshing(true);
        const newerPosts =await getNewerPosts(firstPost.id);
        setRefreshing(false);
        if (newerPosts.length===0){
            return;
        }
        setPosts(newerPosts.concat(posts));    
    };

    return(<FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.container}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.75}
                ListFooterComponent={
                    !noMorePost && (
                        <ActivityIndicator style={styles.spinner} size={32} color='#6200ee'/>
                    )
                }
                refreshControl={
                    //onRefresh => 화면의 맨 위에서 아래로 끌어당겼을 때 호출
                    //
                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
                />
            );
}

//rendering할때마다 매번 만드는 것보다 한번 만들고 재사용 하는 것 이 성능면에서 좋아서 컴포넌트 밖에 선언.
const renderItem = ({item}) =>(
    <PostCard
        createdAt={item.createdAt}
        description={item.description}
        id={item.id}
        user={item.user}
        photoURL={item.photoURL}
        title={item.title}/>
);

const styles = StyleSheet.create({
    container: {
        paddingBottom:48,
    },
    spinner:{
        height: 64,
    },
});

export default FeedScreen;