import {View, Text, TouchableWithoutFeedback, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import tw from 'twrnc';
import TextBold from '../styles/TextBold';
import TextLight from '../styles/TextLight';

const Model = ({message, buttons, setAlert}) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, [scale, opacity]);

  return (
    <Animated.View
      style={[
        tw`bg-[#12121250] absolute w-full h-full z-10 flex justify-center items-center`,
        {
          opacity: opacity,
        },
      ]}>
      <Animated.View
        style={[
          tw`bg-white rounded w-4/5 p-4 flex justify-center items-center`,
          {
            transform: [{scale: scale}],
          },
        ]}>
        <TextBold text={message} style={tw`my-2.8 text-center`} />
        <View style={tw`w-full flex justify-center items-center`}>
          {buttons.map((button, i) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setAlert(false);
              }}
              key={i}>
              <View
                style={tw`${
                  (i === 1 || buttons.length === 1) && 'bg-[#121212]'
                } border-2 border-[#121212] w-3/4 px-4 py-2 my-1.8 mx-2 rounded`}>
                <TextLight
                  text={button.text}
                  style={tw`${
                    i === 1 || buttons.length === 1
                      ? 'text-white'
                      : 'text-[#121212]'
                  } text-center text-sm`}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default Model;
