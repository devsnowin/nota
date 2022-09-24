import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GlobalStyles} from '../styles/GlobalStyles';
import TextBold from '../styles/TextBold';
import TextLight from '../styles/TextLight';
import LoginScreen from './LoginScreen';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [lessSeurePass, setLessSeurePass] = useState(false);

  let name;

  const getData = async () => {
    try {
      name = await AsyncStorage.getItem('username');
      if (name !== null) {
        setUsername(name);
      }
    } catch (e) {
      console.log('Error in Getting user name in Local storage, error: ', e);
    }
  };

  useEffect(() => {
    getData();

    return function cleanUp() {
      name = '';
    };
  }, []);

  const loginUser = async () => {
    if (nameInput.length >= 3) {
      try {
        await AsyncStorage.setItem('username', nameInput);
        navigation.replace('Home');
      } catch (e) {
        console.log('error: ', e);
      }
      setLessSeurePass(false);
    } else {
      setLessSeurePass(true);
    }
  };

  return (
    <>
      {username === '' ? (
        <LoginScreen
          nameInput={nameInput}
          setNameInput={setNameInput}
          loginUser={loginUser}
          lessSeurePass={lessSeurePass}
        />
      ) : (
        <View style={[GlobalStyles.container, tw`justify-center items-center`]}>
          <TextBold
            text={`Welocme back`}
            style={tw`text-3xl text-center leading-relaxed`}
          />
          <TextBold
            text={username}
            style={tw`text-3xl text-center leading-relaxed`}
          />
          <View style={tw`flex justify-center items-center`}>
            <Image
              source={require('../assets/Notes-bro.png')}
              style={tw`w-68 h-68`}
            />
            <TextLight
              text="Easily Manage Your Notes On Your Phone"
              style={tw`text-center text-lg`}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => navigation.replace('Home')}>
            <View style={tw`bg-[#121212] py-4 px-6 my-8 rounded-full`}>
              <TextLight text="Lets Start!" style={tw`text-white`} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};

export default WelcomeScreen;
