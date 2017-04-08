import { Directive, Inject, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService, FirebaseService } from 'fire-slack/app/services';
import { UserInfo } from 'fire-slack/app/interfaces';


@Directive({
  selector: '[userScope]',
  exportAs: 'userScope'
})
export class UserScopeDirective {
  private uid$: BehaviorSubject<string|null>;
  userInfo$: Observable<UserInfo>;

  @Input('userScope')
  set uid(uid: string) {
    this.uid$.next(uid);
  }

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(FirebaseService) private firebaseService: FirebaseService
  ) {
    this.uid$ = new BehaviorSubject<string|null>(null);

    this.userInfo$ =
      this.uid$
        .distinctUntilChanged()
        .filter(uid => !!uid)
        .map(uid => this.firebaseService.database.ref(`users/${uid}`))
        .switchMap(ref => FirebaseService.observe(ref))
        .map(snapshot => snapshot.val() as UserInfo);
  }
}
