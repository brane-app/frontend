import { Client } from "imonke";
import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";

import { TextInputValidated } from "../component";
import { Auth, do_submit, Input } from "../library/auth";
import Events, { Event } from "../library/events";

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

const draw_auth_toggle = (current, hook) => {
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

const draw_error = (message: string, hook: (value: string) => void) => (
  <Snackbar
    duration={2000}
    visible={message != null}
    onDismiss={() => hook(null)}
    children={message}
  />
);

export default (props) => {
  let [submit_kind, set_submit_kind] = useState(props.kind ?? Auth.register);
  let [nick, set_nick] = useState(null);
  let [email, set_email] = useState(null);
  let [password, set_password] = useState(null);

  let [error_message, set_error_message] = useState("");

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
              .then((client: Client) => {
                Events.dispatch(
                  {
                    type: "AUTH",
                    token: client.token,
                    secret: client.secret,
                    expires: client.token_expires,
                  }
                );
              })
              .catch((caught) => {
                console.log(caught);
                set_error_message(caught.message ?? caught);
              });
          }}
        />
      </View>
      {draw_auth_toggle(submit_kind, set_submit_kind)}
      {draw_error(error_message, set_error_message)}
    </View>
  );
};
