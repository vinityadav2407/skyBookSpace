import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';

const MainStack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      {/* Add more screens here */}
    </MainStack.Navigator>
  );
};

export default MainScreen;