/**
 * @format
 */

import Native from 'react-native';
import root from './app/root';
import {name as appName} from './app.json';

Native.AppRegistry.registerComponent(appName, () => root);
