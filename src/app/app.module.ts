import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChannelService } from './channels.service';
import { UserService } from './user.service';
import { MessageService } from './messages.service';

import { RxChatDataFactoryProvider } from './data.provider';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  providers: [
    RxChatDataFactoryProvider,
    ChannelService,
    MessageService,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
