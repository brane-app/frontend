import React from "react";
import { TextInput } from "react-native";

const props_text_input = (props) => (
  {
    autoCapitalize: "none",
    autoCorrect: false,
    blurOnSubmit: false,
    clearButtonMode: "while-editing",
    placeholder: props.name,
    textAlign: "center",

    onChangeText: (value) => {
      props.valueHook(value);
    },

    ...props,
    style: [props.inputStyle, props.style],
  }
);

export default (props) => <TextInput {...props_text_input(props)} />;
