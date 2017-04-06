import * as Firebase from 'firebase';

export type FirebaseApp = Firebase.app.App;
export type Auth = Firebase.auth.Auth;
export type AuthError = Firebase.auth.Error;
export type Query = Firebase.database.Query;
export type Storage = Firebase.storage.Storage;
export type Database = Firebase.database.Database;
export type Reference = Firebase.database.Reference;
export type DataSnapshot = Firebase.database.DataSnapshot;
export type ThenableReference = Firebase.database.ThenableReference;
export type UserInfo = Firebase.UserInfo;

export type ReferenceEvent
  = 'value'
  | 'child_added'
  | 'child_removed'
  | 'child_changed'
  | 'child_moved';

export interface PartialMessage {
  channel: string;
  content: string;
  timestamp?: number;
  author?: string;
  seenBy?: Array<string>;
}

export interface Message {
  id?: string;
  channel: string;
  content: string;
  timestamp: number;
  author: string;
  seenBy: {[uid: string]: boolean};
}

export type MessageOperation = (msg: Message) => Message;
export type MessageListOperation = (msg: Message[]) => Message[];

export interface Channel {
  cid?: string;
  creator: string;
  name?: string;
  latestMessage?: string;
  timestamp: number;
  private: boolean;
  members: { [uid: string]: boolean };
}

export type ChannelOperation = (msg: Channel) => Channel;
export type ChannelListOperation = (msg: Channel[]) => Channel[];
