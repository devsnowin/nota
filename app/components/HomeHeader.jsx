import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';

import tw from 'twrnc';
import TextBold from '../styles/TextBold';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex flex-row justify-between items-center`}>
      <TextBold style={[tw`text-xl`]} text="My Notes" />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ProfileScreen')}>
        <Image source={require('../assets/Avatar.png')} style={tw`w-14 h-14`} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeHeader;
