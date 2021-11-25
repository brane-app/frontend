import { Client } from "imonke";

import { Input, SubmitKind } from "./types";

export const do_submit = async (
  kind: SubmitKind,
  fields: { [key: Input]: string },
): Client => {
  let client: Client = new Client({});
  let ok: bool = false;

  switch (kind) {
    case SubmitKind.login:
      ok = await client.login(
        {
          email: fields.get(Input.email),
          password: fields.get(Input.password),
        },
      );
      break;
    case SubmitKind.register:
      ok = await client.create({
        nick: fields.get(Input.nick),
        email: fields.get(Input.email),
        password: fields.get(Input.password),
      });
      break;
  }

  return client;
};
