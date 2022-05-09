import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet,useWindowDimensions} from 'react-native';
import BorderedInput from '../components/BorderedInput';
import IconRightButton from '../components/IconRightButton';
import ProfileCard from '../components/ProfileCard';
import {getUserProfile} from '../lib/users';
import {getPosts, PAGE_SIZE, getOlderPosts, getNewerPosts} from '../lib/posts';
import { TextInput } from 'react-native-paper';
import SearchHeader from './SearchHeader';

function FindFriendScreen() {
  // const [inputText,setInputText]=useState('');
  const [users, setUsers] = useState(null);
  const [keyword,onChangeText]=useState('');
  const [Loading, setLoading] = useState('');
  const {width}=useWindowDimensions();


  useEffect(() => {
    //컴포넌트가 처음 마운트될 때(화면을 보여주는 시점에서)
    //포스트 목록 조회 후 'posts' 상태에 담기
    getUserProfile().then(setUsers);
  }, []);
  // const onSubmit = async () => {
  //친구맺기버튼 누른 경우
  //     setLoading(true);

  //}
  const filtered=
    keyword === ''
        ? [] :users.filter((user)=>
            [user.displayName].some((text)=>text.includes(keyword)),
        );


  return (
      <View style={styles.container}>
      <SearchHeader
        keyword={keyword}
        onChangeText={onChangeText}/>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        //    onEndReached={onLoadMore}
        //    onEndReachedThreshold={0.75}
        //    ListFooterComponent={
        //        !noMorePost && (
        //            <ActivityIndicator style={styles.spinner} size={32} color='#bdbdbd'/>
        //        )
        //    }
        //    refreshControl={
        //onRefresh => 화면의 맨 위에서 아래로 끌어당겼을 때 호출
        //
        //        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        //    }
      />
      </View>
  );
}
const renderItem = ({item}) => (
  <ProfileCard
    id={item.id}
    // user={item.user}
    displayName={item.displayName}
    photoURL={item.photoURL}
    //isFriend={item.isFriend}
    //onSubmit={onSubmit}
  />
);
const styles = StyleSheet.create({
  container: {
   // flex: 1,
    backgroundColor: 'rgba(48,47,47,1)',
  },
  list: {
    paddingBottom: 25,
  },
  input: {
    //borderColor: ,
    //borderWidth: 1,
    flex:1,
    paddingHorizontal: 16,
    height: 48,
    borderRadius:5,
    backgroundColor: '#4A4A4A',
    color: '#bdbdbd',
  },
});

export default FindFriendScreen;
