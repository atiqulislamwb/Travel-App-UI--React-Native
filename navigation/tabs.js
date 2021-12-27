import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import  Dashboard  from "../screens/Dashboard.js";
import { COLORS, FONTS, icons } from "../constants";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: COLORS.black,
                    borderTopColor: "transparent",
                    height: 70
                }
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={icons.maps}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? 'red' : COLORS.gray
                                }}
                            />
                        </View>
                    ),
                      headerShown: false,
                }}
            />
            <Tab.Screen
                name="Bookmark"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.bookmark}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.blue : COLORS.gray
                                }}
                            />
                        </View>
                    ),
                      headerShown: false,
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.calendar}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.blue : COLORS.gray
                                }}
                            />
                        </View>
                    ),
                      headerShown: false,
                }}
            />
            <Tab.Screen
                name="Plane"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.plane}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.blue : COLORS.gray
                                }}
                            />
                        </View>
                    ),
                      headerShown: false,
                
                }}
            />
        </Tab.Navigator>
    )
}



export default Tabs;