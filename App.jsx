/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import {
    Animated,
    Button,
    Dimensions,
    StatusBar,
    Text,
    View,
} from 'react-native';
import { StyleSheet } from "react-native";
import Sound from 'react-native-sound';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import BirthdayScreen from './src/screens/BirthdayScreen';

const Stack = createNativeStackNavigator();
function App() {
    SystemNavigationBar.navigationHide();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='BirthdayScreen'
                    component={BirthdayScreen}
                />
                <Stack.Screen
                    name='SplashScreen'
                    component={SplashScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}




export default App;
