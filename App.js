import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Place from './screens/Place'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './navigation/tabs';
const Stack = createStackNavigator();
const App = () => {
  

  return (
    <NavigationContainer>
     <Stack.Navigator
       screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Dashboard"}
     >
       
      <Stack.Screen   name="Dashboard"
          component={Tabs}
          options={{ headerShown: false }}  />

          <Stack.Screen   name="Place"
          component={Place}
          options={{ headerShown: false }}  />

        
     </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;