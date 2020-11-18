import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginView from "./views/login"
import ProfileView from "./views/profile"
import { AllFeedView } from "./views/feed"

const Stack = createStackNavigator()
const App = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
            <Stack.Screen name = "login" component = { LoginView }/>
            <Stack.Screen name = "profile" component = { ProfileView }/>
            <Stack.Screen name = "feed_all" component = { AllFeedView }/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default App
