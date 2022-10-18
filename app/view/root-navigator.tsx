import React from "react";
import { NavigationScreenProp } from "react-navigation"
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Feed from "./feed";
import Auth from "./auth";
import UserProfile from "./user-profile";

const draw_feed_all = (props: any) =>
  <Feed feed={"all"} {...props} />;

const draw_register = (props: { navigation: NavigationScreenProp<any, any> }) =>
  <Auth kind={"register"} {...props} />

const draw_profile = (props: { id: string }) =>
  <UserProfile self={true} id={props.id} />;

export default () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Feeds" component={draw_feed_all} />
        <Drawer.Screen name="Profile" component={draw_profile} />
        <Drawer.Screen name="Register" component={draw_register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
