import * as moment from 'moment';
import { v1 } from 'uuid';
import { FactoryProvider } from '@angular/core';

import { User, PartialChannel, Channel, PartialMessage, AppUser } from 'app/interfaces';
import { ChannelService, MessageService, UserService } from 'app/services';
import { OpaqueToken } from '@angular/core';

export const RxChatData = new OpaqueToken('rx-chat-data');

window['moment'] = moment;

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
      isPrivate: false,
      members: [ AppUser, currentUser, otherUser1, otherUser2 ]
    };

const privateConversation: Channel
  = {
      id: v1(),
      name: 'Chat with Allison',
      creator: currentUser,
      isPrivate: true,
      members: [ otherUser1, currentUser ]
    };

const messages: PartialMessage[]
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
    channelService.createChannel(privateConversation);
    messages.map(msg => messageService.createMessage(msg));
    channelService.channels$
      .take(1)
      .subscribe(channels =>
        channelService.setActiveChannel(channels[0])
      );
  };

export const RxChatDataFactoryProvider: FactoryProvider = {
  provide: RxChatData,
  deps: [UserService, ChannelService, MessageService],
  useFactory: dataFactory
};
