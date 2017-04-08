import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MessageService, UserService, AuthService } from 'fire-slack/app/services';

@Component({
  selector: 'nav-bar',
  template: `
  <nav
    style="z-index: 11;"
    class="navbar navbar-light bg-faded d-flex flex-row z-depth-1">
    <a class="navbar-brand mr-auto" href="#">{{brandLinkText$ | async}}</a>
    <span
      *ngIf="(unseenMessageCount$ | async) > 0"
      class="navbar-text">
      You have {{unseenMessageCount$ | async}} unseen messages
    </span>
    <a class="nav-item nav-link" href="#" (click)="signOut()">Leave</a>
  </nav>
  `
})
export class NavBarComponent {
  // private unseenMessageCount$: Observable<number>;
  private brandLinkText$: Observable<string>;

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(UserService) private userService: UserService,
    @Inject(AuthService) private authService: AuthService
  ) {
    // this.unseenMessageCount$ = this.messageService.unseenMessages$.map(msgs => msgs.length);

    const userName$ = this.userService.currentDisplayName$;

    this.brandLinkText$
      = this.authService.isLoggedIn$
          .switchMap(isLoggedIn => isLoggedIn ? userName$ : Observable.of('FireSlack'));

  }

  signOut(event: Event) {
    event.preventDefault();
    this.authService.signOut();
  }
}
