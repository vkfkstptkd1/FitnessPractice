import React, {useContext, createContext, useState} from 'react';

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null); //user상태 관리
  const [achieve, setAchive] = useState();
  const [achieveinfo, setAchieveInfo] = useState({});
  return (
    <UserContext.Provider
      children={children}
      value={{
        user,
        setUser,
        achieve,
        setAchive,
        achieveinfo,
        setAchieveInfo,
      }}
    />
  );
}
export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
