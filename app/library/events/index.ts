import { configureStore } from "@reduxjs/toolkit";
import { State, default_state } from "./state";

interface auth {
  type: "AUTH";
  token: string;
  secret: string;
  expires: number;
}

interface self_update {
  type: "SELF_UPDATE";
  update: { [key: string]: any; };
}

export type Event = auth | self_update;

const handle = (state: State = default_state, event: Event): State => {
  switch (event.type) {
    case "AUTH":
      return {
        ...state,
        auth: {
          authed: event.token != "" && event.expires > Date.now() / 1000,
          token: event.token,
          secret: event.secret,
          expires: event.expires,
        }
      };
    case "SELF_UPDATE":
      return {
        ...state,
        self: {
          ...state.self,
          ...event.update,
        }
      };
  }
};

const store = configureStore({ reducer: handle });

store.subscribe(() => console.log(store.getState()));

export default store;
