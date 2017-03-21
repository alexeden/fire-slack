import * as moment from 'moment';
import { v1 } from 'uuid';
import { FactoryProvider } from '@angular/core';

import { User, Channel, PartialMessage, AppUser } from 'app/interfaces';
import { ChannelService, MessageService, UserService } from 'app/services';
import { OpaqueToken } from '@angular/core';

export const RxChatData = new OpaqueToken('rx-chat-data');

const currentUser: User
  = {
      id: v1(),
      name: 'Alex',
      avatarUrl: '/assets/alex.jpg'
    };

const allison: User
  = {
      id: v1(),
      name: 'Allison',
      avatarUrl: '/assets/allison.jpg'
    };

const michael: User
  = {
      id: v1(),
      name: 'Michael',
      avatarUrl: ''
    };

const publicChannel: Channel
  = {
      id: v1(),
      name: 'Public Channel',
      creator: AppUser,
      isPrivate: false,
      members: [ AppUser, currentUser, allison, michael ]
    };

const privateConversation: Channel
  = {
      id: v1(),
      name: 'Chat with Allison',
      creator: currentUser,
      isPrivate: true,
      members: [ allison, currentUser ]
    };

const messages: PartialMessage[]
  = [
      {
        id: v1(),
        channel: publicChannel,
        timestamp: moment().subtract(20, 'minutes').toDate(),
        author: currentUser,
        content: 'Oh hai everyone!',
        seenBy: []
      },
      {
        id: v1(),
        channel: publicChannel,
        timestamp: moment().subtract(19, 'minutes').toDate(),
        author: michael,
        content: 'RxChat is a garbage app for garbage people.',
        seenBy: []
      },
      {
        id: v1(),
        channel: publicChannel,
        timestamp: moment().subtract(1, 'minutes').toDate(),
        author: allison,
        content: 'Caramel fudge the fuck off.',
        seenBy: []
      }
    ];

const dataFactory =
  (userService: UserService, channelService: ChannelService, messageService: MessageService) => {
    userService.setCurrentUser({ ...currentUser, channels: [publicChannel] });
    userService.addKnownUser(currentUser, allison, michael);
    channelService.createChannel(publicChannel);
    channelService.createChannel(privateConversation);
    messages.map(msg => messageService.createMessage(msg));
    channelService.channels$
      .take(1)
      .subscribe(channels =>
        channelService.setActiveChannel(channels[1])
      );
  };

export const RxChatDataFactoryProvider: FactoryProvider = {
  provide: RxChatData,
  deps: [UserService, ChannelService, MessageService],
  useFactory: dataFactory
};
