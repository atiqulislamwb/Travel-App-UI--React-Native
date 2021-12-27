import React from 'react'
import { View , Text ,Image } from 'react-native'
import {  icons, COLORS, SIZES, FONTS } from "../constants/index.js";

function Rating({ containerStyle , rate }) {
   const starComponents = []
   for(let i=0 ; i <rate ; i++ ){
       starComponents.push(
         <Image source={icons.star} key={`full-${i}`} style={{ marginLeft: i === 0 ? 0 : 5 , width:15 ,height:15  }}  resizeMode='cover'   />
       )
   }
     return(
       <View style={{flexDirection:'row' , ...containerStyle}} >
             {starComponents}
       </View>
     )



}
export default Rating