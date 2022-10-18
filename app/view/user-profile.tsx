import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";

import UserCard from "../component/user-card";
import { get_self, User, user_default } from "../library/brane/user";
import { store } from "../library/events/store";

type user_props = { self: true; } | { self: false, user: User; };

export default (props: user_props) => {
  const [user, set_user] = useState(user_default);

  useEffect(
    () => {
      console.log("updating");
      if (user.id) return;

      if (props.self) {
        const { auth: { authed, token } } = store.getState();
        if (!authed) {
          throw "self view loaded without auth";
        }

        get_self(token).then((self_user: User) => set_user(self_user));
      }
    },
    [user],
  );

  return <View style={{ flex: 1 }}>
    <UserCard user={user} />
  </View>;
};

