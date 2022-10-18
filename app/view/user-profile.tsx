import React from "react";
import { View, Text } from "react-native";

export default (props: { self: boolean, id: string }) =>
  <View style={{ flex: 1 }}>
    <Text>`profile of us? {props.self}`</Text>
  </View>;
