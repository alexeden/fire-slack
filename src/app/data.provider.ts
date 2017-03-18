import { FactoryProvider } from '@angular/core';
import { ChannelService } from './channels.service';
import { UserService } from './user.service';
import { MessageService } from './messages.service';
import { OpaqueToken } from '@angular/core';

export const RxChatData = new OpaqueToken('rx-chat-data');

const dataFactory =
  (userService: UserService, channelService: ChannelService, messageService: MessageService) => {
    console.log(`I'm the factory!`);
  };

export const dataProvider: FactoryProvider = {
  provide: RxChatData,
  deps: [UserService, ChannelService, MessageService],
  useFactory: dataFactory
};
