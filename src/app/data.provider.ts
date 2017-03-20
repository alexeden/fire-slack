import * as moment from 'moment';
import { v1 } from 'uuid';
import { FactoryProvider } from '@angular/core';

import { User, Channel, Message, AppUser } from 'app/interfaces';
import { ChannelService, MessageService, UserService } from 'app/services';
import { OpaqueToken } from '@angular/core';

export const RxChatData = new OpaqueToken('rx-chat-data');


const currentUser: User
  = {
      id: v1(),
      name: 'Alex',
      avatarUrl: ''
    };

const otherUser1: User
  = {
      id: v1(),
      name: 'Allison',
      avatarUrl: ''
    };

const otherUser2: User
  = {
      id: v1(),
      name: 'Luke',
      avatarUrl: ''
    };

const publicChannel: Channel
  = {
      id: v1(),
      name: 'Public',
      creator: AppUser,
      members: [ AppUser, currentUser, otherUser1, otherUser2 ]
    };

const messages: Message[]
  = [
      {
        id: v1(),
        channel: publicChannel,
        timestamp: moment().subtract(20, 'minutes').toDate(),
        author: currentUser,
        content: 'Oh hai everyone!'
      }
    ];

const dataFactory =
  (userService: UserService, channelService: ChannelService, messageService: MessageService) => {
    userService.setCurrentUser({ ...currentUser, channels: [publicChannel] });
    channelService.createChannel(publicChannel);
    messages.map(msg => messageService.createMessage(msg));
  };

export const RxChatDataFactoryProvider: FactoryProvider = {
  provide: RxChatData,
  deps: [UserService, ChannelService, MessageService],
  useFactory: dataFactory
};
