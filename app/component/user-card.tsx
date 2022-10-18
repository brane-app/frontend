import React from "react";
import { View, Text } from "react-native";
import { User } from "../library/brane/user";

export default (props: { user: User; }) => (
  <View style={{ flex: 1, flexDirection: "row" }}>
    <Text>{props.user.nick}</Text>
    <Text>since {props.user.created}</Text>
  </View>
);
