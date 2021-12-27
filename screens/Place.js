import React,{useState ,useRef, useEffect} from 'react'
import {Button , View , Text ,TouchableOpacity, ScrollView , FlatList, Image, ImageBackground , Animated , Platform , SafeAreaView } from 'react-native'
import { icons, COLORS, SIZES, FONTS } from "../constants/index.js";
import profile_pic from '../profile_pic.jpg'
import TextButton from '../components/TextButton'
import {Icon} from 'react-native-elements'
import SlidingUpPanel from 'rn-sliding-up-panel';

import MapView , {PROVIDE_GOOGLE , Marker} from 'react-native-maps'
import Rating from '../components/Rating'

import {MapStyle} from '../styles/MapStyle'



function Place({ navigation, route}) {

 const[places , setPlaces] = useState(null)
 const [selectedHotel , setSelectedHotel] = useState(null)
 const [allowDragging, setAllowDragging] = useState(true)

  const _draggedValue = useRef(new Animated.Value(0)).current

  let _panel = useRef(null)

  useEffect(()=>{
     const { selectedPlace} = route.params;
         setPlaces(selectedPlace)
     _draggedValue.addListener((valuObj)=>{
       if(valuObj.value > SIZES.height){
         setAllowDragging(false)
       }
     })

     return()=>{
       _draggedValue.removeAllListeners()
     }

  },[route.params])


 function renderPlace(){

   return(
   <ImageBackground
    
         source={places?.image}
         style={{
           width:'100%',
           height:'100%'
         }}
        
  

   >

  
   <View style={{  flexDirection : 'row' , alignItems: 'center' , justifyContent:'space-between'   , paddingHorizontal: SIZES.padding  , marginBottom:100, }} >
          <TouchableOpacity style={{ width: 50, height:50 , backgroundColor:COLORS.transparentBlack , alignItems:'center' , justifyContent:'center',                                     borderRadius:30 , marginTop:20 }}  onPress={()=> navigation.goBack()} >
                     <Image resizeMode="contain"  source={icons.left_arrow} style={{width: 25 , height: 25 , tintColor:COLORS.white }}  /> 
          </TouchableOpacity>
             
        

   </View>


    
    <View  style={{  flexDirection : 'row' , alignItems: 'center' , justifyContent:'space-between', marginTop:350,    }} >
         <Text  style={{ color:COLORS.white , ...FONTS.largeTitle  }}  >{places?.name} </Text>
         <View  style={{flexDirection: 'row' , alignItems: 'center' , justifyContent:'center' }} > 
               <Text  style={{ color:COLORS.white , ...FONTS.h3 , marginTop:5 }}  >{places?.rate} </Text>
               <Image  source={icons.star} style={{width: 20 , height: 20 }} />
         </View>
           
    </View>
      <Text style={{marginBottom: SIZES.padding , color : COLORS.white , ...FONTS.body3 ,  textAlign:"center" ,  }}  >{places?.description} </Text>

           <View  style={{   flex:1 , alignItems: "center" , justifyContent:'center' }} > 

            <TouchableOpacity  style={{  height:50 , width: 280 , backgroundColor: COLORS.white , borderRadius:20 , flexDirection:'row' ,alignItems: "center" , justifyContent:'center' }}     >
                  
                     <Text  style={{color : 'black', ...FONTS.h2  , fontStyle:'bold', fontWeight:900 }} >  Book A Tour </Text>
                     <Icon name="plane" type="font-awesome" size={28} color='#000' style={{ marginTop:5 }} />
                 
          </TouchableOpacity>
           </View>
             
          

   </ImageBackground>

   )
 }

     function renderMap(){
        return(
          <>
          <SlidingUpPanel 
            ref={c => (
              _panel= c
            )}

            draggableRange={{top: SIZES.height +120 , bottom:120}}
            showBackdrop={false}
            snappingPoints={[ SIZES.height + 120 ]}
            height={ SIZES.height + 120 }
            friction={0.7}
            allowDragging={allowDragging}
            animatedValue={_draggedValue}
            onBottomReached={()=>
                setAllowDragging(true) }

          
            >
              <View  style={{flex:1 , backgroundColor:"transparent" }}   >
                   <View style={{height: 120 , backgroundColor: "transparent" , alignItems:'center' , justifyContent:'center'}} >
                         <Image source={icons.up_arrow} style={{width: 20 , height:20 , tintColor:COLORS.white}}  />
                         <Text  style={{color: COLORS.white  , ...FONTS.h3 }} > SWIPE FOR DETAILS </Text>
                   </View>
              
                   <View  style={{flex:1 , backgroundColor: COLORS.white , alignItems:'center' , justifyContent:'center'}}> 


                         <MapView  style={{width:"100%" , height:'100%' , }} provider={PROVIDE_GOOGLE} initialRegion={places?.mapInitialRegion} customMapStyle=                                   {MapStyle} >
                               
                           {places?.hotels.map((hotel , index)=>(
                                          <Marker
                                            key={index}
                                            coordinate={hotel.latlng}
                                            identifier={hotel.id}
                                            onPres={()=> setSelectedHotel(hotel)}
                                          
                                          > 

                                             <Image source={  selectedHotel?.id == hotel.id ?  icons.bed_on  : icons.bed_off} resizeMode="contain" style={{                                                        width:50 , height:50 }}    /> 
                                               
                                                   



                                          </Marker>
                           ))}

                         </MapView>


                                                 <View style={{ flexDirection: "row" , alignItems: "center" , justifyContent: 'space-around'  }}  >
                                                            <TouchableOpacity onPress={()=> navigation.goBack()} style={{width:50 , height:50 , backgroundColor :                                                                     COLORS.transparentBlack , borderRadius:30}} >
                                                             <Image source={icons.left_arrow} style={{width:30 , height: 30, tintColor:COLORS.white}} />
                                                            </TouchableOpacity>

                                                                <Text style={{color:COLORS.white , ...FONTS.h3 , }} >{places?.name}</Text>

                                                               <TouchableOpacity onPress={()=> console.log('preessedddddddd')} style={{width:50 , height:50 ,                                                                         backgroundColor : COLORS.transparentBlack , borderRadius:30}}>
                                                                 <Image source={icons.setting} style={{width:30 , height: 30, tintColor:COLORS.white}} />
                                                               </TouchableOpacity>

                                                   </View>

                                            {selectedHotel && 

                                         
                                            
                                            <View  style={{position:'absolute' , bottom:'30' , left:0 , right:0, padding: SIZES.radius}}
                                             >

                                             <Text  style={{color : COLORS.white , ...FONTS.h1}} >  Hotels in {selectedHotel?.name} </Text>
                                            
                                                  <View
                                                   style={{flexDirection: 'row ' , borderRadius:15 , marginTop:10 , padding:SIZES.padding , backgroundColor:                                                             COLORS.transparentBlack}}
                                                  
                                                  >
                                                        <image source={selectedHotel?.image }  style={{width:90 , height:120 , borderRadius:20 }}                                                                                          resizeMode="cover" />

                                                         <View style={{flex:1 ,marginLeft:6 , justifyContent:'center', }} >

                                                             <Text  style={{color: COLORS.white , ...FONTS.h3}} >{selectedHotel?.name} </Text>

                                                            <Rating containerStyle={{marginTop: SIZES.base , }} rate={selectedHotel?.rate}  />

                                                              <View style={{flexDirection:'row' , marginTop: 6}} >

                                                                 <TextButton label="Details" custonContainerStyle={{width: 100 , height:45 , marginTop:7 }}                                                                              customLabelStyle={{...FONTS.h3}} onPress={()=> console.log('details')}    />
                                                                  
                                                                   <View style={{ flex:1 ,alignItems:'flex-end', justifyContent:'center' }} >
                                                                      <Text style={{color: COLORS.lightGray , ...FONTS.body5 }} > {selectedHotel?.price} / night                                                                          </Text>
                                                                   </View>

                                                                     
                                                              <View>
                                                         </View>

                                                  </View>
                                            
                                             </View>
                                       

                                      }



                   </View>





               </View>
                        

          </SlidingUpPanel>

          </>
        )
     }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {renderPlace()}
        {renderMap()}
      
    </View>
  );
}
export default Place