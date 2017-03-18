import { v1 } from 'uuid';

export interface Message {
  readonly id: string;
  readonly timestamp: Date;
  readonly author: User;
  readonly content: string;
  readonly channel: Channel;
  seenBy?: User[];
}

export type MessageOperation = (msg: Message) => Message;
export type MessageListOperation = (msg: Message[]) => Message[];

export interface Channel {
  readonly id: string;
  readonly creator: User;
  readonly name: string;
  members: User[];
  latestMessage?: Message;
  messages: Message[];
}

export interface User {
  readonly id: string;
  readonly name: string;
  avatarUrl?: string;
  channels: Channel[];
  messages: Message[];
}

export const AppUser: User
  = {
      id: v1(),
      name: 'RxChat',
      avatarUrl: '',
      channels: [],
      messages: []
    };
