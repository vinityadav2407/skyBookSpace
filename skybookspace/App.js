// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import Home from './src/components/Home'


// // Replace direct notifee import with this:
// let notifee = null;
// if (Platform.OS !== 'web') {
//   const nf = require('@notifee/react-native');
//   notifee = nf.default;
// }

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//       <Home/>
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


/**
 * @format
 */

// import React from 'react';                          // ← ADD React import
// import { Platform, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';  // ← ADD Platform
// import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// import Home from './src/components/Home';

// // ✅ guard notifee — native only, won't crash on web
// let notifee = null;
// if (Platform.OS !== 'web') {
//   const nf = require('@notifee/react-native');
//   notifee = nf.default;
// }

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <Home />
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import store from './src/network/store';
import SwitchScreen from './src/routes/SwitchScreen';

let notifee = null;
if (Platform.OS !== 'web') {
  const nf = require('@notifee/react-native');
  notifee = nf.default;
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* <Provider store={store}> */}
        <SwitchScreen />
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}

export default App;