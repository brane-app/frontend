import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { Login } from "./app/view";

export default App = () => (
  <SafeAreaView>
    <StatusBar style={"light"} translucent={false} />
    <Login />
  </SafeAreaView>
);
