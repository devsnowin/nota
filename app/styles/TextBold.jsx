import {Text} from 'react-native';
import React from 'react';

const TextBold = ({text, style, ...other}) => {
  return (
    <Text
      style={[{fontFamily: 'Poppins Bold', color: '#121212'}, style]}
      {...other}>
      {text}
    </Text>
  );
};

export default TextBold;
