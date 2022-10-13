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
