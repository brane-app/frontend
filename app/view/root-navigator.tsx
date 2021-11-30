import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Feed from "./feed";
import Auth from "./auth";
import { Auth as AuthKind } from "../library/auth";

const draw_register = () => <Auth kind={AuthKind.register} />;

export default (props) => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Feeds" component={Feed} />
        <Drawer.Screen name="Profile" component={View /* TODO */} />
        <Drawer.Screen name="Register" component={draw_register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
