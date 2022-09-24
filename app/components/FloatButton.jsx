import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

const FloatButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Editor')}>
      <View
        style={tw`bg-[#121212] w-15 h-15 absolute bottom-[4%] right-[2%] flex justify-center items-center rounded-full`}>
        <Text style={tw`text-white text-4xl`}>+</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FloatButton;
