import React from "react";
import { View, Text } from "react-native";

interface Props {
  id: string;
  self: boolean;
}

export default (props: Props) =>
  <View style={{ flex: 1 }}>
    <Text>`profile of {props.id}`</Text>
  </View>;
