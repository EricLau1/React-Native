/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
