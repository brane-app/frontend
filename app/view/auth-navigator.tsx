import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./auth";
import AuthGate from "./auth-gate";
import RootNavigator from "./root-navigator";
import { Auth as AuthKind } from "../library/auth";

// TODO React doesn't like it when I pass the client -> props
// what else can I do?
const on_auth = (props, client) => props.navigation.navigate("Root", { client });

const draw_register = (props) => (
  <Auth
    kind={AuthKind.register}
    on_auth={on_auth}
    {...props}
  />
);

const draw_login = (props) => (
  <Auth
    kind={AuthKind.login}
    on_auth={on_auth}
    {...props}
  />
);

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