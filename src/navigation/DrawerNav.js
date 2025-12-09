import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import BottomTabNavigator from './BottomBarNav';
import HelpSupportScreen from '../screens/HelpSupportScreen';

const Drawer = createDrawerNavigator();

// Placeholder for Settings Screen - can be replaced with actual screen later
const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveTintColor: '#FF6B35',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="HomeTab"
        component={BottomTabNavigator}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNav

const styles = StyleSheet.create({})