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

const Stack = createStackNavigator()

function no_navigation({nav}) {
    return {
        title: "foobar 2000"
    }
}

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
