import React, { useState } from "react";
import { Button, Text, View } from "react-native";

import { TextInputValidated } from "../component";

enum Input {
  nick,
  email,
  password,
}

const draw_fields = (props_each: any[], props: any) => (
  props_each.map(
    (it) => <TextInputValidated {...props} {...it} />,
  )
);

const fields = (kinds: [kind: Input, hook: (value: string) => null][]) => (
  draw_fields(
    kinds.map(([kind, hook]) => ({
      name: Input[kind],
      secureTextEntry: kind === Input.password,
      key: kind,
      onChangeText: hook,
    })),
    {/*TODO*/},
  )
);

export default (props) => {
  let [nick: string, set_nick] = useState();
  let [email: string, set_email] = useState();
  let [password: string, set_password] = useState();

  return (
    <View>
      <View>
        {fields([
          [Input.nick, set_nick],
          [Input.email, set_email],
          [Input.password, set_password],
        ])}
      </View>
      <View>
        <Button title={"submit"} />
      </View>
    </View>
  );
};
