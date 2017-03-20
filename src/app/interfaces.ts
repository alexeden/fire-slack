import { v1 } from 'uuid';

export interface PartialMessage {
  channel: Channel;
  content: string;
  id?: string;
  timestamp?: Date;
  author?: User;
  seenBy?: User[];
}

export interface Message {
  channel: Channel;
  content: string;
  id: string;
  timestamp: Date;
  author: User;
  seenBy: User[];
}

export type MessageOperation = (msg: Message) => Message;
export type MessageListOperation = (msg: Message[]) => Message[];

export interface PartialChannel {
  members: User[];
  name?: string;
  id?: string;
  creator?: User;
  isPrivate?: boolean;
  latestMessage?: Message;
  messages?: Message[];
}

export interface Channel {
  id: string;
  creator: User;
  name: string;
  isPrivate: boolean;
  members: User[];
  latestMessage?: Message;
  messages: Message[];
}

export type ChannelOperation = (msg: Channel) => Channel;
export type ChannelListOperation = (msg: Channel[]) => Channel[];


export interface User {
  readonly id?: string;
  readonly name: string;
  avatarUrl?: string;
}

export const AppUser: User
  = {
      id: v1(),
      name: 'RxChat',
      avatarUrl: ''
    };
