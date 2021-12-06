import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Feed from "./feed";
import Auth from "./auth";
import { Auth as AuthKind } from "../library/auth";

const on_auth = (props, client) => {/* TODO */};

const draw_feed_all = (client) =>
  (props) => <Feed feed={"all"} client={client} {...props} />;

const draw_register = (props) => (
  <Auth
    kind={AuthKind.register}
    on_auth={on_auth}
    {...props}
  />
);

export default (props) => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Feeds"
          component={draw_feed_all(props.route?.params?.client)}
        />
        <Drawer.Screen name="Profile" component={View /* TODO */} />
        <Drawer.Screen name="Register" component={draw_register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
