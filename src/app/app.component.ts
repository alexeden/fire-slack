import { Component, Inject } from '@angular/core';
import { RxChatData } from 'app/data.provider';
import { MessageService } from 'app/messages.service';

@Component({
  selector: 'chat-app',
  template: `
    <div class="container-fluid p-x-0">
      <div class="row">
        <div class="col-md-4 m-x-0 p-r-0">
        </div>
        <div class="col-md-8 p-x-0 m-x-0">
        </div>
      </div>
    </div>
  `
  // <chat-threads></chat-threads>
  // <chat-window></chat-window>
})
export class AppComponent {
  constructor(
    private messageService: MessageService,
    @Inject(RxChatData) private data: void
  ) {
    console.log(`AppComponent`);
  }
}
