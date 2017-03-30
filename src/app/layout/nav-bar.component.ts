import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MessageService, AuthService } from 'fire-slack/app/services';

@Component({
  selector: 'nav-bar',
  template: `
  <nav
    style="z-index: 11; box-shadow: 0 3px 6px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.11);"
    class="navbar navbar-light bg-faded d-flex flex-row">
    <a class="navbar-brand mr-auto" href="#">FireSlack</a>
    <span
      *ngIf="(unseenMessageCount$ | async) > 0"
      class="navbar-text">
      You have {{unseenMessageCount$ | async}} unseen messages
    </span>
    <a class="nav-item nav-link" href="#" (click)="authService.signIn()">Login</a>
    <a class="nav-item nav-link" href="#" (click)="authService.signOut()">Leave</a>
  </nav>
  `
})
export class NavBarComponent {
  private unseenMessageCount$: Observable<number>;

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.unseenMessageCount$ = this.messageService.unseenMessages$.map(msgs => msgs.length);
  }
}
