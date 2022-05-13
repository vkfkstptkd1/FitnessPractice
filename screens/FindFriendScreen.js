import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ProfileCard from '../components/ProfileCard';
import SearchContext from '../contexts/SearchContext';
import {useUserContext} from '../contexts/UserContext';
import {getUserProfile} from '../lib/users';
import SearchHeader from './SearchHeader';

function FindFriendScreen() {
  const {user, setUser} = useUserContext();
  const [users, setUsers] = useState(null);
  const {keyword} = useContext(SearchContext);

  useEffect(() => {
    //컴포넌트가 처음 마운트될 때(화면을 보여주는 시점에서)
    //포스트 목록 조회 후 'posts' 상태에 담기
    getUserProfile().then(setUsers);
    console.log(setUsers);
  }, []);
  const filtered =
    keyword === ''
      ? []
      : users.filter(u => [u.displayName].some(text => text.includes(keyword)));

  return (
    <View style={styles.container}>
      <SearchHeader />
      <View style={styles.list}>
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}
const renderItem = ({item}) => (
  <ProfileCard
    //    id={item.id}
    displayName={item.displayName}
    photoURL={item.photoURL}
    //    followingid={item.followingid}
  />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(48,47,47,1)',
  },
  list: {
    borderTopWidth: 0.5,
    borderTopColor: '#bdbdbd',
  },
  input: {
    //borderColor: ,
    //borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 5,
    backgroundColor: '#4A4A4A',
    color: '#bdbdbd',
  },
});

export default FindFriendScreen;
