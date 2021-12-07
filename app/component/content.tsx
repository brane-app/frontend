import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

const placeholder = "https://placekitten.com/500/300";

export default (props) => {
  let [file_url, set_file_url] = useState(placeholder);

  useEffect(() => {
    props.content.file_url.then((it) => set_file_url(it));
  });

  return (
    <AutoHeightImage
      source={{ uri: file_url }}
      width={props.width}
    />
  );
};
