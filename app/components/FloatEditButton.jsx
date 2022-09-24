import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

const FloatEditButton = ({setReadMode}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => setReadMode(prevValue => !prevValue)}>
      <View
        style={tw`absolute bottom-[4%] right-[4%] bg-[#121212] w-15 h-15 rounded-full flex items-center justify-center`}>
        <MaterialCommunityIcons name="pencil" size={32} color="#fff" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FloatEditButton;
