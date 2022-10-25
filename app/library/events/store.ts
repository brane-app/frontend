import { configureStore } from "@reduxjs/toolkit";

import { Event } from "./event";
import { State, default_state } from "./state";
import { invoke, subscribe } from "./subscribe";

const do_handle = (state: State = default_state, event: Event): State => {
    switch (event.type) {
        case "LOAD":
            return { ...event.state, loaded: Date.now() };
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

const reducer = (state: State = default_state, event: Event): State => {
    const result = do_handle(state, event);
    invoke(event.type, event, state).catch((reason) => { throw `failed to invoke for event ${event}\n${reason}`; });
    return result;
};

export const store = configureStore({ reducer: reducer, preloadedState: default_state });
export const dispatch = (event: Event) => store.dispatch(event);

export { Event };
export { subscribe };

