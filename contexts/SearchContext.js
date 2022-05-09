import React, {createContext,useState} from 'react';
const SearchContext = createContext();

export function SearchContextProvider({child}){
    const [keyword,onChangeText] = useState('');
    return(
        <SearchContext.Provider value={{keyword,onChangeText}}>
            {child}
        </SearchContext.Provider>
    );
}

export default SearchContext;