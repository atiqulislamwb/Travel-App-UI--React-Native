import React from 'react'
import { View , Text ,TouchableOpacity } from 'react-native'
import { COLORS, SIZES, FONTS } from "../constants/index.js";

function TextButton({label , custonContainerStyle, customLabelStyle , onPress }) {
  return (
   <TouchableOpacity
    style={{
        height: 55 , 
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...custonContainerStyle
    }}
    onPress={onPress}
   >
      <Text style={{ ...FONTS.h2 , ...customLabelStyle }}   >{label}</Text>
   </TouchableOpacity>
  );
}
export default TextButton