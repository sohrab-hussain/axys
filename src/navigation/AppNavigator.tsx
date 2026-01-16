import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { RootStackParamList } from './types';

// Import screens
import HomeScreen from '../../src/app/screens/HomeScreen';
import SettingsScreen from '../../src/app/screens/SettingsScreen';
import { Image, TouchableOpacity } from 'react-native';
import LoginScreen from '../app/screens/LoginScreen.tsx';
import SignUpScreen from '../app/screens/SignUpScreen.tsx';
import VerifyOTPScreen from '../app/screens/VerifyOTPScreen.tsx';
import { t } from 'i18next';
import UserDetailsScreen from '../app/screens/PersonalDetailsScreen.tsx';
import BiometricsSetupScreen from '../app/screens/SetBiometricsScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation: 'slide_from_right', // Explicitly set animation
            presentation: 'card', // Use card presentation
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: t('home'),
              headerTransparent: true,
              headerTitle: () => (
                <Image
                  source={require('../../src/images/axys-logo.png')}
                  style={{ width: 100, height: 30 }}
                  resizeMode="contain"
                />
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                  style={{ marginRight: 15 }}
                >
                  <Image
                    source={require('../../src/images/globe.png')}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: t('settings'),
              headerStyle: {
                backgroundColor: '#000',
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: t('login'),
              headerStyle: {
                backgroundColor: '#000',
              },
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: t('signup'),
              headerStyle: {
                backgroundColor: '#000',
              },
            }}
          />
          <Stack.Screen
            name="VerifyOTP"
            component={VerifyOTPScreen}
            options={{
              title: t('verifyOTP'),
              headerStyle: {
                backgroundColor: '#000',
              },
            }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{
              title: t('userDetails'),
              headerStyle: {
                backgroundColor: '#000',
              },
            }}
          />
          <Stack.Screen
            name="BiometricsSetup"
            component={BiometricsSetupScreen}
            options={{
              title: t(''),
              headerBackIcon: true,
              headerStyle: {
                backgroundColor: '#000',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
