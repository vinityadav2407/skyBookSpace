import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/loginScreen/Login';

const AuthStack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {Platform.OS !== 'web' && (
        <AuthStack.Screen name="Splash" component={SplashScreen} />
      )}
      <AuthStack.Screen name="Login" component={LoginScreen} />
      {/* <AuthStack.Screen name="Signup" component={Signup} /> ← ADD THIS */}
     </AuthStack.Navigator>
  );
};

export default AuthScreen;