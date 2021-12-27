import React,{useState ,useRef, useEffect} from 'react'
import {Button , View , Text ,TouchableOpacity, ScrollView , FlatList, Image, Animated , Platform , SafeAreaView } from 'react-native'
import { dummyData, icons, images, theme, COLORS, SIZES, FONTS } from "../constants/index.js";
import profile_pic from '../profile_pic.jpg'
import TextButton from '../components/TextButton'
const COUNTRIES_ITEM_SIZE = SIZES.width / 3 ;
const PLACES_ITEM_SIZE = Platform.OS === "ios" ? SIZES.width / 1.25 : SIZES.width/1.2 ;
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2 ; 

function Dashboard({ navigation }) {
    const [countries , setCountries]=useState([{id:-1}, ...dummyData.countries , {id:-2}])
    const[places , setPlaces] = useState([{id:-1}, ...dummyData.countries[1].places , {id:-2}])
    const countryScrollX = useRef(new Animated.Value(0)).current ;
    const placesScrollX  =  useRef(new Animated.Value(0)).current ;
    const [placesScrollPosition , setPlacesScrollPosition ]=useState(0)
 
    
   function renderHeader(){
     return(
       <>
       <View style={{ flexDirection: 'row' , paddingHorizontal:SIZES.padding, paddingVertical: SIZES.base  }} >
        
               <TouchableOpacity style={{width: 45 , height: 45 , alignItems:'center' , justifyContent: 'center'}} onPress={()=> console.log('drawer pressed')}  >
               <Image style={{width: 25 , height: 25 , tintColor: COLORS.white }} resizeMode="contain" source={icons.side_drawer}  />
               </TouchableOpacity>
                
              <View  style={{flex: 1, alignItems:'center' , justifyContent: 'center'}} >
               <Text  style={{color: COLORS.white}} >ASIA</Text>
              </View>


              <TouchableOpacity onPress={()=> console.log('profile pressed')} >
                  <Image style={{width: 45 , height: 45 , borderRadius:35 }} resizeMode="cover"   source={profile_pic} />
              </TouchableOpacity>
            
       </View>
       </>
     )
   } 


  function renderCountries(){
      
     return(
            <Animated.FlatList
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={COUNTRIES_ITEM_SIZE}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              data={countries}
              keyExtractor={item=> `${item.id}`}
              contentContainerStyle={{
                alignItems:'center'
              }}   
              onScroll={Animated.event([
                {nativeEvent: {contentOffset :{x: countryScrollX }}} 
              ], {useNativeDriver : false})}
  

              onMomentumScrollEnd={(event)=> {

                //calculate position
                let position = (event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE).toFixed(0)

                //set place
                setPlaces([
                  {id:-1} ,
                  ...dummyData.countries[position].places,
                  {id:-2}
                ])


              }}


             renderItem={({item ,index})=>{
                const opacity= countryScrollX.interpolate({
                   inputRange:[ (index-2) * COUNTRIES_ITEM_SIZE , (index-1) * COUNTRIES_ITEM_SIZE, index * COUNTRIES_ITEM_SIZE   ],
                   outputRange:[0.3 , 1 , 0.3],
                   extrapolate: "clamp"
                })

                const mapSize= countryScrollX.interpolate({
                   inputRange:[ (index-2) * COUNTRIES_ITEM_SIZE , (index-1) * COUNTRIES_ITEM_SIZE, index * COUNTRIES_ITEM_SIZE   ],
                   outputRange:[25 , Platform.OS=== 'ios' ? 80 : 60 , 25],
                   extrapolate: "clamp"
                })

               const fontSize=countryScrollX.interpolate({
                   inputRange:[ (index-2) * COUNTRIES_ITEM_SIZE , (index-1) * COUNTRIES_ITEM_SIZE, index * COUNTRIES_ITEM_SIZE   ],
                   outputRange:[15,  25 , 15],
                   extrapolate: "clamp"
                })
              
              if(index == 0 || index.length -1 ){
                return(
                  <View style={{ width: COUNTRIES_ITEM_SIZE   }}  >
                  
                  </View>
                )
              }else{
                   return(
                    <Animated.View
                   opacity={opacity}
                   style={{ height:130 , width: COUNTRIES_ITEM_SIZE , alignItems:'center' , justifyContent: 'center'  }}
                    >  
                    
                       <Animated.Image
                        source={item.image}   resizeMode="contain"  style={{width: mapSize , height: mapSize , tintColor: COLORS.white}}  />
                      <Animated.Text  style={{color: COLORS.white, fontSize:fontSize}} >{item.name}</Animated.Text>
                    </Animated.View>
                )
              } }}>

                 </Animated.FlatList>
     )
  }
  
 function exploreButton(){
    //get index
     const currentIndex= parseInt(placesScrollPosition , 10 ) + 1
    //navigate next screen
    navigation.navigate('Place' , {selectedPlace: places[currentIndex]})
 }

 function renderPlaces(){


   

   return(
     <Animated.FlatList
          pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places}
              snapToInterval={Platform.OS=== "ios" ? PLACES_ITEM_SIZE + 20 : PLACES_ITEM_SIZE}
              decelerationRate={0}                 
              scrollEventThrottle={16}
              snapToAlignment="center"
            
              keyExtractor={item=> `${item.id}`}
              bounces={false}

              onScroll={Animated.event([
                {nativeEvent: {contentOffset :{x: placesScrollX }}} 
              ], {useNativeDriver : false})}


              onMomentumScrollEnd={(event)=>{
                //calcute position
                var position = (event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE).toFixed(0)
                 
                //setplaces position
              setPlacesScrollPosition(position)

              }}


               renderItem={({item , index})=>{


               const opacity = placesScrollX.interpolate({
                  inputRange:[ (index-2) * PLACES_ITEM_SIZE , (index-1) * PLACES_ITEM_SIZE, index * PLACES_ITEM_SIZE   ],
                   outputRange:[0.3 , 1 , 0.3],
                   extrapolate: "clamp"
               })

               let activeHeight = 0 

               if(Platform.OS){
                 if(SIZES.height > 800){
                     activeHeight = SIZES.height / 2 
           
                 }else{
                    activeHeight=SIZES.height / 1.65
                 }
               }else{
                 activeHeight = SIZES.height / 1.6 
               }

                const height = placesScrollX.interpolate({
                     inputRange:[ (index-2) * PLACES_ITEM_SIZE , (index-1) * PLACES_ITEM_SIZE, index * PLACES_ITEM_SIZE   ],
                      outputRange:[SIZES.height/2.25 , activeHeight , SIZES.height/2.25 ],
                     extrapolate: "clamp"
                })
                 
                 if(index == 0  || index == places.length - 1 ){
                   return (
                     <View  style={{width: EMPTY_ITEM_SIZE}}  />
             )
                 }else{
                 return(
                          <Animated.View
                           opacity={opacity}
                           style={{
                             width: PLACES_ITEM_SIZE,
                             height: height,
                             alignItems:'center',
                             padding: 10 , 
                             borderRadius: 25 ,
                             margin:5, 
                           }}
                          >
                               <Animated.Image  
                                source={item.image} 
                                resizeMode="cover" 
                                style={{position: 'absolute' , width: '100%' , height : '100%' , borderRadius:25, }} 
                                 />

                            <View style={{  flex:1, alignItems:'center' , justifyContent:'flex-end' , marginHorizontal:SIZES.padding}} >

                                  <Text style={{ marginBottom: SIZES.radius , color : COLORS.white , ...FONTS.h1 }} >{item.name}</Text>

                                 <Text style={{ marginBottom: SIZES.padding , color : COLORS.white , ...FONTS.body3 ,  textAlign:"center" ,  }} > {item.description}                                  </Text>
                                    
                                    <TextButton label="Explore"   onPress={()=> exploreButton()} custonContainerStyle= {{
                                      position:'absolute' , bottom:-40 , width:140   }} />
                            </View>
                             
                          </Animated.View>
                 )

                 }
               }}


     
    />
            
     
   )
 }

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: COLORS.black}}>
          {renderHeader()}
        <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: Platform.OS === "ios" ? 40 : 0 }}  >

               <View  style={{ height: 700 }} >
                   <View> {renderCountries() }</View>
                   <View  style={{ height: Platform.OS === "ios" ? 500 : 450 }} >{renderPlaces()} </View>

               </View>
        </ScrollView>
    </SafeAreaView>
  );
}
export default Dashboard