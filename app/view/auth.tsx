import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";

import { TextInputValidated } from "../component";
import { auth_password, auth_register } from "../library/brane/auth";
import { dispatch, subscribe, Event } from "../library/events"

type submit_kind = "login" | "register"
type submit_field = "nick" | "email" | "password"

const draw_inputs = (kinds: [field: submit_field, hook: (value: string) => void][]) => (
  kinds.map(([field, hook]) => (
    <TextInputValidated
      key={`input_text_${field}`}
      valueHook={hook}
      secureTextEntry={field === "password"}
    />
  ))
);

const draw_auth_toggle = (current_kind: submit_kind, hook: (value: submit_kind) => void) => {
  const [target, set_target] = useState(current_kind == "register" ? "login" : "register" as submit_kind);

  return (
    <Pressable
      onPress={() => {
        hook(target);
        set_target(current_kind);
      }}
    >
      <Text>{`I'd rather ${target}`}</Text>
    </Pressable>
  );
};

const draw_error = (message: string, hook: (value: string) => void) => (
  message == ""
    ? null
    : <Snackbar
      duration={2000}
      visible={message != null}
      onDismiss={() => hook("")}
      children={message}
    />
);

export default (props: { kind: submit_kind }) => {
  let [submit_kind, set_submit_kind] = useState(props.kind ?? "register");
  let [nick, set_nick] = useState("");
  let [email, set_email] = useState("");
  let [password, set_password] = useState("");

  let [error_message, set_error_message] = useState("");

  subscribe("AUTH", (event: Event) => {
    // TODO navigate to profile view
  })

  return (
    <View>
      <View>
        {
          submit_kind == "register"
            ? draw_inputs([["nick", set_nick], ["email", set_email], ["password", set_password]])
            : draw_inputs([["email", set_email], ["password", set_password]])
        }
      </View>
      <View>
        <Button
          title={"submit"}
          onPress={async () => {
            const token = submit_kind == "register"
              ? await auth_register(nick, email, password, "")
              : await auth_password(email, password)

            dispatch({ type: "AUTH", ...token })
          }}
        />
      </View>
      {draw_auth_toggle(submit_kind, set_submit_kind)}
      {draw_error(error_message, set_error_message)}
    </View>
  );
};
