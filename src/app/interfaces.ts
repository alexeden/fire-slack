import * as Firebase from 'firebase';

export type FirebaseApp = Firebase.app.App;
export type Auth = Firebase.auth.Auth;
export type Storage = Firebase.storage.Storage;
export type Database = Firebase.database.Database;
export type DbReference = Firebase.database.Reference;
export type DataSnapshot = Firebase.database.DataSnapshot;
export type UserInfo = Firebase.UserInfo;


export interface PartialMessage {
  channel: Channel;
  content: string;
  id?: string;
  timestamp?: Date;
  author?: string;
  seenBy?: Array<string>;
}

export interface Message {
  channel: Channel;
  content: string;
  id: string;
  timestamp: Date;
  author: string;
  seenBy: Array<string>;
}

export type MessageOperation = (msg: Message) => Message;
export type MessageListOperation = (msg: Message[]) => Message[];

export interface PartialChannel {
  members: string[];
  name?: string;
  id?: string;
  creator?: string;
  isPrivate?: boolean;
}

export interface Channel {
  id: string;
  creator: string;
  name: string;
  isPrivate: boolean;
  members: string[];
}

export type ChannelOperation = (msg: Channel) => Channel;
export type ChannelListOperation = (msg: Channel[]) => Channel[];
