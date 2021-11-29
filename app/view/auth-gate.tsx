import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Auth as AuthKind } from "../library/auth";
import Auth from "./auth";

const draw_gate = (props) => (
  <View>
    <Button title={"register"} onPress={() => props.navigation.navigate("Register")} />
    <Button title={"log in"} onPress={() => props.navigation.navigate("Login")} />
    <Button title={"skip"} />
  </View>
);

const draw_register = () => <Auth kind={AuthKind.register} />;
const draw_login = () => <Auth kind={AuthKind.login} />;

const d = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Gate" component={draw_gate} />
        <Stack.Screen name="Register" component={draw_register} />
        <Stack.Screen name="Login" component={draw_login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => d();
