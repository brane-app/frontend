import { Client } from "imonke";

import { Auth, Input } from "./types";

const api_default = "https://api.brane.gastrodon.io";

export const do_submit = async (
  kind: Auth,
  fields: { [key: Input]: string },
): Client => {
  let client: Client = new Client({ api: api_default });
  let ok: bool = false;

  switch (kind) {
    case Auth.login:
      ok = await client.login(
        {
          email: fields.get(Input.email),
          password: fields.get(Input.password),
        },
      );
      break;
    case Auth.register:
      ok = await client.create({
        nick: fields.get(Input.nick),
        email: fields.get(Input.email),
        password: fields.get(Input.password),
      });
      break;
  }

  return client;
};
