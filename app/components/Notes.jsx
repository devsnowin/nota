import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Note from './Note';
import tw from 'twrnc';

const Notes = ({notes, searchValue}) => {
  const searchTerm = searchValue.toLowerCase();
  const [filteredNotes, setFilteredNotes] = useState([]);

  const filterNotes = () => {
    if (searchValue !== '') {
      const newNotes = notes.filter(
        (note, index) =>
          note.title.toLowerCase().includes(searchTerm) ||
          note.body.toLowerCase().includes(searchTerm),
      );
      setFilteredNotes(newNotes);
    }
  };

  useEffect(() => {
    filterNotes();
  }, [searchValue]);

  return (
    <FlatList
      style={tw`mt-6`}
      data={searchTerm.length < 1 ? notes : filteredNotes}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <Note key={item.id} note={item} />}
    />
  );
};

export default Notes;
