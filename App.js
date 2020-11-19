import React from "react"
import { AppRegistry, Text } from "react-native"

import App from "./app/root"
import { name } from './app.json'

AppRegistry.registerComponent(name, () => App)

export default App
