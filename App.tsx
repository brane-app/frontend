import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { AuthNavigator } from "./app/view";

export default () => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar translucent={false} />
    <AuthNavigator />
  </SafeAreaView>
);
