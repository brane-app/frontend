import { Client } from "imonke";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";

import { TextInputValidated } from "../component";
import { Auth, do_submit, Input } from "../library/auth";

const draw_inputs = (props_each: any[], props: any) => (
  props_each.map(
    (it) => <TextInputValidated {...props} {...it} />,
  )
);

const draw_inputs_for = (kinds: [kind: Input, hook: (value: string) => null][]) => (
  draw_inputs(
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
  let [submit_kind, set_submit_kind] = useState(Auth.register);
  let [nick, set_nick] = useState(null);
  let [email, set_email] = useState(null);
  let [password, set_password] = useState(null);

  let [error_visible, set_error_visible] = useState(false);
  let [error_message, set_error_message] = useState(null);

  return (
    <View>
      <View>
        {draw_inputs_for([
          submit_kind == Auth.register ? [Input.nick, set_nick] : null,
          [Input.email, set_email],
          [Input.password, set_password],
        ].filter((it) => it))}
      </View>
      <View>
        <Button
          title={"submit"}
          onPress={() => {
            do_submit(
              submit_kind,
              new Map([
                [Input.nick, nick],
                [Input.email, email],
                [Input.password, password],
              ]),
            )
              .then((client) => {/*TODO*/})
              .catch((caught) => {
                console.log(caught);
                set_error_message(caught.message ?? caught);
              });
          }}
        />
      </View>
      <Snackbar
        duration={2000}
        visible={error_message != null}
        onDismiss={() => set_error_message(null)}
        children={error_message}
      />
    </View>
  );
};
