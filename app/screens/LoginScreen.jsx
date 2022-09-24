import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import tw from 'twrnc';
import {GlobalStyles} from '../styles/GlobalStyles';
import TextBold from '../styles/TextBold';
import TextLight from '../styles/TextLight';

const LoginScreen = ({nameInput, setNameInput, loginUser, lessSeurePass}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex flex-1 justify-center items-center`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../assets/login-bg.png')}
          resizeMode="cover"
          style={tw`flex h-full w-full justify-center items-center`}>
          <View style={tw`bg-white shadow-2xl w-11/12 py-8 px-4 rounded-xl`}>
            <TextBold
              text="Enter your name"
              style={tw`text-4xl text-left my-2 self-start`}
            />
            <TextInput
              style={tw`border-2 my-4 w-full px-6 text-xl text-[#121212] rounded-full`}
              value={nameInput}
              onChangeText={e => setNameInput(e)}
            />
            {lessSeurePass && (
              <TextLight
                text="password must be greater than 3 characters !"
                style={tw`text-red-600 text-xs text-center pb-2`}
              />
            )}
            <TouchableWithoutFeedback onPress={loginUser}>
              <View
                style={tw`bg-[#121212] px-6 py-4 my-2 rounded-full self-start`}>
                <TextBold
                  text="Get Started!"
                  style={tw`text-white text-center`}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
