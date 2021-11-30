import React from "react";
import { Button, View } from "react-native";

export default (props) => (
  <View>
    <Button title={"register"} onPress={() => props.navigation.navigate("Register")} />
    <Button title={"log in"} onPress={() => props.navigation.navigate("Login")} />
    <Button title={"skip"} onPress={() => props.navigation.navigate("Root")} />
  </View>
);
