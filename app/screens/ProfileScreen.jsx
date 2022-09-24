import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import {GlobalStyles} from '../styles/GlobalStyles';
import TextLight from '../styles/TextLight';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('unknown');
  const [edit, setEdit] = useState(false);
  const [lessSeurePass, setLessSeurePass] = useState(false);

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem('username');
      if (name !== null) {
        setUsername(name);
      }
    } catch (e) {
      console.log('Error in Getting user name in Local storage, error: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const saveUser = async () => {
    if (username.length >= 3) {
      try {
        await AsyncStorage.setItem('username', username);
        Alert.alert('Successfully saved the changes!');
      } catch (e) {
        console.log('error: ', e);
      }
      setLessSeurePass(false);
      setEdit(false);
    } else {
      setLessSeurePass(true);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (edit) {
              Alert.alert(
                'Unsaved changes....',
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
            } else {
              navigation.goBack();
            }
          }}>
          <Ionicons name="ios-arrow-back-sharp" size={32} color="black" />
        </TouchableWithoutFeedback>
      </View>
      <View style={tw`flex flex-1 items-center justify-center`}>
        <Image source={require('../assets/Avatar.png')} style={tw`w-34 h-34`} />
        <TextInput
          value={username}
          onChangeText={e => setUsername(e)}
          editable={edit}
          style={[
            tw`w-2/3 text-2xl text-center text-[#121212] mb-6 pb-0 ${
              edit === true ? 'border-b-2' : 'border-0'
            }`,
            {fontFamily: 'Poppins Bold'},
          ]}
        />
        {lessSeurePass && (
          <TextLight
            text="password must be greater than 3 characters !"
            style={tw`text-red-600 text-xs pb-2`}
          />
        )}
        <View
          style={tw`flex flex-row flex-wrap items-center justify-center items-center`}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!edit) {
                setEdit(true);
              } else {
                saveUser();
              }
            }}>
            <View style={tw`bg-[#121212] w-32 mr-2 py-2.8 rounded-full`}>
              <TextLight
                text={!edit ? 'Edit' : 'Save'}
                style={tw`text-white text-lg text-center`}
              />
            </View>
          </TouchableWithoutFeedback>
          {edit && (
            <TouchableWithoutFeedback
              onPress={() => {
                setEdit(false);
                getData();
              }}>
              <View style={tw`border-2 w-32 ml-2 py-2.8 rounded-full`}>
                <TextLight
                  text="Cancel"
                  style={tw`text-[#121212] text-center text-lg`}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
