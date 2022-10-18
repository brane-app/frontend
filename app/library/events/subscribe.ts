import { Event } from "./event";
import { uuid } from "../uuid";
import { State } from "./state";

const callbacks = new Map<string, Callback>();
const subscriptions = new Map<string, Set<string>>();

export type Callback = (data: Event, state: State) => void | Promise<void>;

const get_subscription = (event_type: string): Set<string> =>
    subscriptions.get(event_type) ?? new Set<string>();

const get_callback = (id: string): Callback => {
    const callback = callbacks.get(id);
    if (callback === undefined) throw `no such callback ${id}`;

    return callback;
};

const unsubscriber = (event_type: string, id: string) =>
    () => {
        callbacks.delete(id);

        const subs = get_subscription(event_type);
        subs.delete(id);
        subscriptions.set(event_type, subs);
    };

export const subscribe = (event_type: string, callback: Callback): () => void => {
    const id = uuid();
    callbacks.set(id, callback);

    const subs = get_subscription(event_type);
    subs.add(id);
    subscriptions.set(event_type, subs);

    return unsubscriber(event_type, id);
};

// we could promise.all once we know this fundamentally works fine
export const invoke = async (event_type: string, event: Event, state: State) => {
    for (const callback_id of get_subscription(event_type)) {
        await get_callback(callback_id)(event, state);
    }
};
