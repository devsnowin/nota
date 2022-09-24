import {Alert, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalStyles} from '../styles/GlobalStyles';
import NoteScreenHeader from '../components/NoteScreenHeader';
import FloatEditButton from '../components/FloatEditButton';
import Editor from '../components/Editor';
import moment from 'moment';
import {deleteNote, getAllNotes, updateNote} from '../database/Schema';
import {NotesContext} from '../context/NotesContext';
import {useNavigation} from '@react-navigation/native';

const NoteScreen = ({route}) => {
  const {
    paramId,
    paramTitle,
    paramBody,
    paramDate,
    paramFavorite,
    paramHighlight,
  } = route.params;
  const [readMode, setReadMode] = useState(true);
  const [title, setTitle] = useState(paramTitle);
  const [body, setBody] = useState(paramBody);
  const [fav, setFav] = useState(paramFavorite);
  const [highlight, setHighlight] = useState(paramHighlight);

  const [notes, setNotes] = useContext(NotesContext);

  const navigation = useNavigation();

  const fetchNotes = () => {
    getAllNotes()
      .then(res => {
        if (res !== []) {
          setNotes(res);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = () => {
    if (title !== '' || body !== '') {
      const data = {
        id: paramId,
        title,
        body: `${body}\n\n`,
        date: moment(Date.now()).format('ddd, D MMM'),
        favorite: fav,
        highlight,
      };
      updateNote(data);
      fetchNotes();
      Alert.alert('Successfully saved changes!');
      navigation.navigate('Home');
    }
  };

  const delNote = () => {
    deleteNote(paramId);
    fetchNotes();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <NoteScreenHeader
        readMode={readMode}
        deleteNote={delNote}
        updateNote={saveNote}
      />
      <Editor
        readMode={readMode}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        fav={fav}
        setFav={setFav}
        highlight={highlight}
        setHighlight={setHighlight}
        date={paramDate}
        id={paramId}
        update={!readMode ? true : false}
      />
      {readMode && (
        <FloatEditButton setReadMode={setReadMode} readMode={readMode} />
      )}
    </SafeAreaView>
  );
};

export default NoteScreen;
