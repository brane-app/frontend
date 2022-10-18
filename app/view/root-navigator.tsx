import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Feed from "./feed";
import Auth from "./auth";
import UserProfile from "./user-profile";

const ROUTE = "Feeds";

const draw_feed_all = (props: any) =>
  <Feed feed={"all"} {...props} />;

const draw_register = (props: any) =>
  <Auth kind={"register"} {...props} />;

const draw_self = () =>
  <UserProfile self={true} />;

export default (props: { route: string; }) => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName={props.route ?? ROUTE}>
        <Drawer.Screen name="Profile" component={draw_self} />
        <Drawer.Screen name="Feeds" component={draw_feed_all} />
        <Drawer.Screen name="Register" component={draw_register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
