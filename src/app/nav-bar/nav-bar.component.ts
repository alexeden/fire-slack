import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MessageService, FirebaseService } from 'app/services';

@Component({
  selector: 'nav-bar',
  // style="z-index: 11; box-shadow: 0 3px 6px rgba(0,0,0,0.03), 0 3px 6px rgba(0,0,0,0.11);">
  template: `
  <nav class="navbar navbar-light bg-faded d-flex flex-row justify-content-between">
    <a class="navbar-brand mr-auto" href="#">FireSlack</a>
    <span
      *ngIf="(unseenMessageCount$ | async) > 0"
      class="navbar-text">
      You have {{unseenMessageCount$ | async}} unseen messages
    </span>
    <span class="navbar-text">Logged in? {{(firebase.isLoggedIn$ | async) ? 'Yes' : 'No'}}</span>
    <a class="nav-item nav-link" href="#" (click)="firebase.signIn()">Login</a>
    <a class="nav-item nav-link" href="#" (click)="firebase.signOut()">Leave</a>
  </nav>
  `
})
export class NavBarComponent {
  private unseenMessageCount$: Observable<number>;

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(FirebaseService) private firebase: FirebaseService
  ) {
    this.unseenMessageCount$ = this.messageService.unseenMessages$.map(msgs => msgs.length);
  }
}
