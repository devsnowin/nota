import {Text} from 'react-native';
import React from 'react';

const TextLight = ({text, style, ...other}) => {
  return (
    <Text
      style={[{fontFamily: 'Poppins Regular', color: '#121212'}, style]}
      {...other}>
      {text}
    </Text>
  );
};

export default TextLight;
