import axios from "axios";

import { BRANE_API } from "./api";

export type User = {
  id: string;
  nick: string;
  bio: string;
  created: number;
  admin: boolean;
  moderator: boolean;
  post_count: number;
  subscriber_count: number;
  subscription_count: number;
};

export const user_default = {
  id: "", nick: "", bio: "", created: 0,
  admin: false, moderator: false,
  post_count: 0, subscriber_count: 0, subscription_count: 0
};

export type SelfUser = User & { email: string; };

export const self_default = { ...user_default, email: "" };

export const get_self = async (token: string): Promise<SelfUser> => {
  const response = await axios({
    baseURL: BRANE_API,
    url: "/me",
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
  });

  return response.data.user;
};

type get_user_params = { id: string, kind: "ID"; } | { nick: string, kind: "NICK"; };

const get_user_path = (params: get_user_params): string =>
  params.kind === "ID"
    ? `/user/id/${params.id}`
    : `/user/nick/${params.nick}`;

export const get_user = async (params: get_user_params): Promise<User> => {
  const response = await axios({
    baseURL: BRANE_API,
    url: get_user_path(params),
    method: "GET",
  });

  return response.data.user;
};
