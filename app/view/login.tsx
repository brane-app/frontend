import React, { useState } from "react";
import { Button, Text, View } from "react-native";

import { TextInputValidated } from "../component";

enum SubmitKind {
  register,
  login,
}

enum Input {
  nick,
  email,
  password,
}

// TODO:
const do_submit = (
  kind: SubmitKind,
  fields: { [key: Inpit]: string },
): bool => {};

const draw_fields = (props_each: any[], props: any) => (
  props_each.map(
    (it) => <TextInputValidated {...props} {...it} />,
  )
);

const fields = (kinds: [kind: Input, hook: (value: string) => null][]) => (
  draw_fields(
    kinds.map(([kind, hook]) => ({
      name: Input[kind],
      key: kind,
      valueHook: hook,
      secureTextEntry: kind === Input.password,
    })),
    {/*TODO*/},
  )
);

export default (props) => {
  let [submit_kind, set_submit_kind] = useState(SubmitKind.register);
  let [nick, set_nick] = useState(null);
  let [email, set_email] = useState(null);
  let [password, set_password] = useState(null);

  return (
    <View>
      <View>
        {fields([
          submit_kind == SubmitKind.register ? [Input.nick, set_nick] : null,
          [Input.email, set_email],
          [Input.password, set_password],
        ].filter((it) => it))}
      </View>
      <View>
        <Button
          title={"submit"}
          onPress={(_) => {
            do_submit(
              submit_kind,
              new Map([
                [Input.nick, nick],
                [Input.email, email],
                [Input.password, password],
              ]),
            );
          }}
        />
      </View>
    </View>
  );
};
