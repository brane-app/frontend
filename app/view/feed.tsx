import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { Feed } from "imonke";

import { Content } from "../component";

const buffer_growth: number = 10;

const grow_buffer_with = (
  fetched,
  buffer,
  set_buffer,
  set_terminal,
  data_provider,
  set_data_provider,
) => {
  if (fetched.length !== 0) {
    const new_buffer = [...buffer, ...fetched];

    set_buffer(new_buffer);
    set_data_provider(
      (data_provider ?? new DataProvider((it, next) => it = next))
        .cloneWithRows(new_buffer),
    );
  } else {
    set_terminal(true);
  }
};

const grow_buffer = (
  feed,
  terminal,
  set_terminal,
  buffer,
  set_buffer,
  data_provider,
  set_data_provider,
) => {
  if (terminal) {
    return;
  }

  if (buffer.length !== 0) {
    buffer[buffer.length - 1]
      .id
      .then((id) =>
        feed
          .get({ size: buffer_growth, before: id })
          .then((fetched) => {
            grow_buffer_with(
              fetched,
              buffer,
              set_buffer,
              set_terminal,
              data_provider,
              set_data_provider,
            );
          })
      );
  } else {
    feed
      .get({ size: buffer_growth, before: "" })
      .then((fetched) => {
        grow_buffer_with(
          fetched,
          buffer,
          set_buffer,
          set_terminal,
          data_provider,
          set_data_provider,
        );
      });
  }

  if (buffer.length !== 0) {
    buffer[buffer.length - 1].id.then((id) => {
      feed.get({
        size: buffer_growth,
        before: id ?? "",
      }).then(
        (fetched) => {
          if (fetched !== 0) {
            const new_buffer = [...buffer, ...fetched];

            set_buffer(new_buffer);
            set_data_provider(
              (data_provider ?? new DataProvider((it, next) => it = next))
                .cloneWithRows(new_buffer),
            );
          } else {
            set_terminal(true);
          }
        },
      );
    });
  }
};

const content_scroller = (feed) => {
  let [data_provider, set_data_provider] = useState(null);
  let [terminal, set_terminal] = useState(false);
  let [width, set_width] = useState(400);
  let [buffer, set_buffer] = useState([]);

  if (!data_provider) {
    grow_buffer(
      feed,
      terminal,
      set_terminal,
      buffer,
      set_buffer,
      data_provider,
      set_data_provider,
    );

    return <Text>{"getting"}</Text>;
  }

  return (
    <RecyclerListView
      onLayout={(event) => set_width(event.nativeEvent.layout.width)}
      dataProvider={data_provider}
      forceNonDeterministicRendering={true}
      onEndReachedThreshold={300}
      onEndReached={() =>
        grow_buffer(
          feed,
          terminal,
          set_terminal,
          buffer,
          set_buffer,
          data_provider,
          set_data_provider,
        )}
      layoutProvider={new LayoutProvider(
        (index) => 0,
        (type, it) => {
          it.height = 400;
          it.width = width;
        },
      )}
      rowRenderer={(_, it) => <Content content={it} width={width} key={it._data.id} />}
    />
  );
};

export default (props) => {
  let feed = new Feed({ client: props.client, feed: props.feed });

  return (
    <View style={{ flex: 1 }}>
      {content_scroller(feed)}
    </View>
  );
};
