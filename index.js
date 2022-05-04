/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';//uuid library는 index.js에서 import

AppRegistry.registerComponent(appName, () => App);
