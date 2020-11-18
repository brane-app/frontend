import React from "react"
import App from "./app/root"
import { AppRegistry, Text } from "react-native"
import { name } from './app.json'

console.log(App)

AppRegistry.registerComponent(name, () => App)

export default App
