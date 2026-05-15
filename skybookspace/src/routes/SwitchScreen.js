import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
import AuthScreen from './AuthScreen';
import MainScreen from './MainScreen';
import Tabs from './Tabs';

const SwitchScreen = () => {
//   const { logData } = useSelector(state => state.auth); // adjust to your state shape
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 1020;

  return (
    <NavigationContainer>
      { false ? (
        // Logged in
        Platform.OS === 'web' ? (
          <MainScreen />
        ) : (
          <Tabs />
        )
      ) : (
        // Not logged in
        <AuthScreen />
      )}
    </NavigationContainer>
  );
};

export default SwitchScreen;


// import React from 'react';
// import { Platform, Dimensions } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import Tabs from './Tabs';

// const SwitchScreen = () => {
//   return (
//     <NavigationContainer>
//       <Tabs />
//     </NavigationContainer>
//   );
// };

// export default SwitchScreen;