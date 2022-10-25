import React from "react";
import { ReactElement } from "react";
import { useState } from "react";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import { subscribe } from "./app/library/events";

import { AuthNavigator } from "./app/view";

const StaticLoad = () => <Text>loading</Text>;

const Load = (props: { loading: boolean, children: ReactElement; }) =>
  props.loading
    ? <StaticLoad />
    : props.children;

export default () => {
  const [loaded, set_loaded] = useState(false);

  subscribe("LOAD", () => { set_loaded(true); });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <Load loading={!loaded}>
        <AuthNavigator />
      </Load>
    </SafeAreaView>
  );
};

