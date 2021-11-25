import { Client } from "imonke";
import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";

import { TextInputValidated } from "../component";
import { Auth, do_submit, Input } from "../library/auth";

const draw_inputs = (kinds: [kind: Input, hook: (value: string) => null][]) => (
  kinds.map(([kind, hook]) => (
    <TextInputValidated
      name={Input[kind]}
      key={`input_text_${kind}`}
      valueHook={hook}
      secureTextEntry={kind === Input.password}
    />
  ))
);

const submit_kind_switcher = (current, hook) => {
  const [target, set_target] = useState(
    current == Auth.register ? Auth.login : Auth.register,
  );

  return (
    <Pressable
      onPress={() => {
        hook(target);
        set_target(current);
      }}
    >
      <Text>{`I'd rather ${Auth[target]}`}</Text>
    </Pressable>
  );
};

const error = (message: string, hook: (value: string) => null) => (
  <Snackbar
    duration={2000}
    visible={message != null}
    onDismiss={() => hook(null)}
    children={message}
  />
);

export default (props) => {
  let [submit_kind, set_submit_kind] = useState(Auth.register);
  let [nick, set_nick] = useState(null);
  let [email, set_email] = useState(null);
  let [password, set_password] = useState(null);

  let [error_message, set_error_message] = useState(null);

  return (
    <View>
      <View>
        {draw_inputs([
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
      {submit_kind_switcher(submit_kind, set_submit_kind)}
      {error(error_message, set_error_message)}
    </View>
  );
};
