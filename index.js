import React from "react"
import Native from 'react-native';
import App from './app/root';
import {name} from './app.json';

Native.AppRegistry.registerComponent(name, () => App);
