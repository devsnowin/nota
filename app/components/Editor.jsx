import React, {useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import TextLight from '../styles/TextLight';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

const Editor = ({readMode, ...other}) => {
  const [height, setHeight] = useState(0);
  const {
    title,
    setTitle,
    body,
    setBody,
    fav,
    setFav,
    highlight,
    setHighlight,
    date,
    update,
  } = other;

  return (
    <View style={tw`my-4 h-full`}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <View style={tw`w-11/12 pr-4`}>
          <TextInput
            placeholder="New Note"
            style={[
              tw`text-2xl font-bold p-0 text-[#121212]`,
              {height: Math.max(35, height)},
            ]}
            multiline={true}
            placeholderTextColor="#777"
            value={title}
            onContentSizeChange={e =>
              setHeight(e.nativeEvent.contentSize.height)
            }
            onChangeText={e => setTitle(e)}
            editable={readMode ? false : true}
          />
          <TextLight
            text={
              update
                ? `Updated at: ${moment(Date.now()).format('ddd, D MMM')}`
                : `Created at: ${
                    date ? date : moment(Date.now()).format('ddd, D MMM')
                  }`
            }
            style={tw`text-[#7c7c7c] mb-1`}
          />
          <View style={tw`flex flex-row items-center`}>
            <CheckBox
              disabled={readMode}
              value={highlight}
              tintColors={{true: '#121212', false: '#7c7c7c'}}
              onValueChange={newValue => setHighlight(newValue)}
            />
            <TextLight text="Highlights" style={tw`pl-0.5`} />
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => !readMode && setFav(prevFav => !prevFav)}>
          {fav ? (
            <AntDesign name="star" size={34} color="black" />
          ) : (
            <AntDesign name="staro" size={34} color="black" />
          )}
        </TouchableWithoutFeedback>
      </View>
      <View style={tw`pb-[50%]`}>
        {readMode && body !== '' ? (
          <ScrollView
            style={tw`h-full my-4`}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <TextLight text={body} style={[tw`text-base text-[#121212]`]} />
          </ScrollView>
        ) : (
          <TextInput
            placeholder="Write something..."
            placeholderTextColor="#777"
            value={body}
            onChangeText={e => setBody(e)}
            multiline={true}
            style={
              ([tw`h-full`],
              {fontFamily: 'Poppins Regular', fontSize: 16, color: '#121212'})
            }
            textAlignVertical="top"
            editable={readMode ? false : true}
            numberOfLines={2000}
          />
        )}
      </View>
    </View>
  );
};

export default Editor;
