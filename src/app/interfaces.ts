export interface Message {
  readonly id: string;
  readonly timestamp: Date;
  readonly author: string;
  readonly content: string;
  readonly channel: string;
  seenBy: string[];
}

export interface Channel {
  readonly id: string;
  readonly creator: string;
  members: string[];
  latestMessage: string;
  messages: string;
  name?: string;
}

export interface User {
  readonly id: string;
  readonly name: string;
  avatarUrl: string;
  channels: string[];
}
