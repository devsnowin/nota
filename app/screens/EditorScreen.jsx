import {Alert, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalStyles} from '../styles/GlobalStyles';
import EditorHeader from '../components/EditorHeader';
import Editor from '../components/Editor';
import moment from 'moment';
import {createNote, getAllNotes} from '../database/Schema';
import {useNavigation} from '@react-navigation/native';
import {NotesContext} from '../context/NotesContext';

const EditorScreen = () => {
  const [readMode, setReadMode] = useState(false);
  const [fav, setFav] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  const naviagtion = useNavigation();

  const [notes, setNotes] = useContext(NotesContext);

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
    if (title !== '' || body !== '') {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [title, body]);

  const saveNote = () => {
    if (title !== '' || body !== '') {
      const data = {
        id: Date.now(),
        title,
        body: `${body}\n\n`,
        date: moment(Date.now()).format('ddd, D MMM'),
        favorite: fav,
        highlight: highlight,
      };
      createNote(data);
      fetchNotes();

      Alert.alert('Note saved successfully!');

      naviagtion.navigate('Home');
    }
  };

  return (
    <>
      <View style={GlobalStyles.container}>
        <EditorHeader
          setReadMode={setReadMode}
          readMode={readMode}
          disableSave={disableSave}
          updateNote={saveNote}
        />
        <Editor
          readMode={readMode}
          fav={fav}
          setFav={setFav}
          title={title}
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          highlight={highlight}
          setHighlight={setHighlight}
        />
      </View>
    </>
  );
};

export default EditorScreen;
