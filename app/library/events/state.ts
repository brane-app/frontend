export interface State {
  auth: {
    authed: boolean;
    token: string;
    secret: string;
    expires: number;
  };
  self: {
    updated: number;
    id: string;
    nick: string;
  };
}


export const default_state = {
  auth: {
    authed: false,
    token: "",
    secret: "",
    expires: 0,
  },
  self: {
    updated: 0,
    id: "",
    nick: "",
  }
};
