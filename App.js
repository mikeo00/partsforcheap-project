import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './src/lib/supabase';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppNavigator from './src/navigation/AppNavigation';
const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <AppNavigation/>
  );
}
