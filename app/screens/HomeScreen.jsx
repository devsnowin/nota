import {Image, SafeAreaView, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalStyles} from '../styles/GlobalStyles';
import HomeHeader from '../components/HomeHeader';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import Notes from '../components/Notes';
import FloatButton from '../components/FloatButton';

import {getAllNotes} from '../database/Schema';
import {NotesContext} from '../context/NotesContext';
import tw from 'twrnc';
import TextBold from '../styles/TextBold';
import TextLight from '../styles/TextLight';
import Loader from '../components/Loader';

const Home = () => {
  const [notes, setNotes] = useContext(NotesContext);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = () => {
    getAllNotes()
      .then(res => {
        if (res !== []) {
          setNotes(res);
          setFilteredNotes(res);
        }
      })
      .catch(error => console.log(error));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <HomeHeader />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Tabs dataList={notes} setFilteredNotes={setFilteredNotes} />
      {isLoading && <Loader />}
      {notes.length < 1 && !isLoading ? (
        <View style={tw`flex flex-1 justify-center items-center`}>
          <Image
            source={require('../assets/Addnotes.png')}
            style={tw`w-58 h-58`}
          />
          <TextBold text="No Notes" style={tw`text-lg text-center`} />
          <TextLight
            text="Tap the add button to create a note"
            style={tw`text-base text-center`}
          />
        </View>
      ) : (
        <Notes notes={filteredNotes} searchValue={searchValue} />
      )}
      <FloatButton />
    </SafeAreaView>
  );
};

export default Home;

// TODO: check the date finally: 18 feb 2022 9:00 => 1645155414499
