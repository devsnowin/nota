import {
  View,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const EditorHeader = ({setReadMode, ...other}) => {
  const {readMode, disableSave, updateNote} = other;

  const navigation = useNavigation();

  const toastMessage = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={tw`flex flex-row justify-between items-center my-2`}>
      <View style={tw`flex flex-row items-center`}>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              'Unsaved Note....',
              'Are you sure you want to go back ?',
              [
                {
                  text: 'No',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => navigation.goBack(),
                  style: 'default',
                },
              ],
            );
          }}>
          <Ionicons name="ios-arrow-back-sharp" size={32} color="black" />
        </TouchableWithoutFeedback>
      </View>
      <View style={tw`flex flex-row items-center`}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!readMode) {
              toastMessage('Read mode on');
            } else if (readMode) {
              toastMessage('Read mode off');
            }
            setReadMode(prevMode => !prevMode);
          }}>
          <FontAwesome5
            name="book-reader"
            size={24}
            color={readMode ? 'black' : '#a1a1a1'}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={updateNote}>
          <Ionicons
            name="ios-checkmark-sharp"
            size={32}
            color={disableSave ? '#a1a1a1' : 'black'}
            style={tw`ml-6`}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default EditorHeader;
