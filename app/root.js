import React from "react"
import {
    createAppContainer,
} from "react-navigation"
import {
    NavigationContainer,
} from "@react-navigation/native"
import {
    createStackNavigator,
} from "@react-navigation/stack"

import LoginView from "./views/login"
import ProfileView from "./views/profile"
import { AllFeedView } from "./views/feed"

const Stack = createStackNavigator()

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions = {{headerShown: false}}>
                <Stack.Screen
                name = "login"
                component = {LoginView}/>
                <Stack.Screen
                name = "profile"
                component = {ProfileView}/>
                <Stack.Screen
                name = "feed_new"
                component = {AllFeedView}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
