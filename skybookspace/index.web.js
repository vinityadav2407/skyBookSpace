import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

if (module.hot) {
  module.hot.accept();
}

// load vector icon fonts for web
import 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import 'react-native-vector-icons/Fonts/Ionicons.ttf';
import 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import 'react-native-vector-icons/Fonts/Fontisto.ttf';
import 'react-native-vector-icons/Fonts/Entypo.ttf';
import 'react-native-vector-icons/Fonts/AntDesign.ttf';
import 'react-native-vector-icons/Fonts/Octicons.ttf';
import 'react-native-vector-icons/Fonts/EvilIcons.ttf';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

MaterialIcons.loadFont();
FontAwesome.loadFont();
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();
Fontisto.loadFont();
AntDesign.loadFont();
Entypo.loadFont();
Octicons.loadFont();
EvilIcons.loadFont();

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});