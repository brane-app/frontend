import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { AuthGate } from "./app/view";

export default App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar style={"light"} translucent={false} />
    <AuthGate />
  </SafeAreaView>
);
