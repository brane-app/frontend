import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./auth";
import AuthGate from "./auth-gate";
import RootNavigator from "./root-navigator";
import { Auth as AuthKind } from "../library/auth";

const draw_register = () => <Auth kind={AuthKind.register} />;
const draw_login = () => <Auth kind={AuthKind.login} />;

export default () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Gate" component={AuthGate} />
        <Stack.Screen name="Register" component={draw_register} />
        <Stack.Screen name="Login" component={draw_login} />
        <Stack.Screen name="Root" component={RootNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
