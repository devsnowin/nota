import {TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';

import TextBold from '../styles/TextBold';
import TextLight from '../styles/TextLight';
import {useNavigation} from '@react-navigation/native';

const Note = ({note}) => {
  const navigation = useNavigation();

  const noteItemsStyle = tw`
        my-[0.5px]
    `;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('NoteScreen', {
          paramId: note.id,
          paramTitle: note.title,
          paramBody: note.body,
          paramDate: note.date,
          paramFavorite: note.favorite,
          paramHighlight: note.highlight,
        });
      }}>
      <View
        style={[
          tw`border-[#121212] border-2 rounded-2xl my-1.5 py-2 px-4 flex items-start justify-center`,
        ]}>
        <TextBold style={[tw`text-lg`, noteItemsStyle]} text={note.title} />
        <TextLight
          text={note.body}
          style={noteItemsStyle}
          numberOfLines={3}
          ellipsizeMode="tail"
        />
        <TextLight style={[tw`self-end my-1`]} text={note.date} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Note;
