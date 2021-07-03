import { Thing } from "../things";

export interface TokenActorCredentials {
  type: "token";
  token: string;
}

export interface UnknownActorCredentials {
  type: string;
  [key: string]: any;
}

export type ActorCredentials = TokenActorCredentials | UnknownActorCredentials;

export type Actor = Thing;
