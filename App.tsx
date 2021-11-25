import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { Auth } from "./app/view";

export default App = () => (
  <SafeAreaView>
    <StatusBar style={"light"} translucent={false} />
    <Auth />
  </SafeAreaView>
);
