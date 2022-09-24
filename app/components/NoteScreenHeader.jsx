import {View, Text, TouchableWithoutFeedback, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

const NoteScreenHeader = ({readMode, deleteNote, updateNote}) => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex flex-row justify-between items-center`}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!readMode) {
            Alert.alert(
              'Unsaved note....',
              'Are you sure you want to discard all the changes ?',
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
          } else {
            navigation.goBack();
          }
        }}>
        <Ionicons name="ios-arrow-back-sharp" size={32} color="black" />
      </TouchableWithoutFeedback>
      {readMode ? (
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              'Deleting Note....',
              'Are you sure ? Do you want to delete the note ?',
              [
                {
                  text: 'No',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => deleteNote(),
                  style: 'default',
                },
              ],
            );
          }}>
          <MaterialCommunityIcons name="delete" size={32} color="#121212" />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={updateNote}>
          <Ionicons
            name="ios-checkmark-sharp"
            size={32}
            color={'black'}
            style={tw`ml-6`}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default NoteScreenHeader;
