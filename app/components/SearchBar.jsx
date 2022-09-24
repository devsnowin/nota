import {View, TextInput} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({searchValue, setSearchValue}) => {
  return (
    <View
      style={tw`border-2 flex flex-row justify-between items-center rounded-full px-3 my-6`}>
      <TextInput
        value={searchValue}
        onChangeText={e => setSearchValue(e)}
        placeholder="Search notes..."
        placeholderTextColor="#7c7c7c"
        style={[tw`w-11/12 py-2 text-[#121212]`]}
        textAlign="left"
      />
      <Ionicons name="ios-search" size={24} color="#121212" />
    </View>
  );
};

export default SearchBar;
