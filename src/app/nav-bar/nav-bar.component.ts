import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MessageService } from 'app/services';

@Component({
  selector: 'nav-bar',
  template: `
  <nav class="navbar navbar-light bg-faded d-flex flex-row justify-content-between">
    <a class="navbar-brand" href="#">RxChat</a>
    <span
      *ngIf="(unseenMessageCount$ | async) > 0"
      class="navbar-text">
      You have {{unseenMessageCount$ | async}} unseen messages
    </span>
  </nav>
  `
})
export class NavBarComponent {
  private unseenMessageCount$: Observable<number>;

  constructor(
    @Inject(MessageService) private messageService: MessageService
  ) {
    this.unseenMessageCount$ = this.messageService.unseenMessages$.map(msgs => msgs.length);
  }
}
