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
      avatarUrl: '',
      channels: [],
      messages: []
    };

const publicChannel: Channel
  = {
      id: v1(),
      name: 'Public',
      creator: AppUser,
      members: [ AppUser ],
      messages: []
    };


const dataFactory =
  (userService: UserService, channelService: ChannelService, messageService: MessageService) => {
    userService.setCurrentUser({ ...currentUser, channels: [publicChannel] });

  };

export const RxChatDataFactoryProvider: FactoryProvider = {
  provide: RxChatData,
  deps: [UserService, ChannelService, MessageService],
  useFactory: dataFactory
};
