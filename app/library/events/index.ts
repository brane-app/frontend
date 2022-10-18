import { subscribe } from "./subscribe";
import { Event } from "./event";
import { dispatch } from "./store";

dispatch({ type: "INIT" });

export { Event, dispatch, subscribe };
