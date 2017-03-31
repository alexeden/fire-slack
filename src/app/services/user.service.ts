import { Injectable } from '@angular/core';
import { Subject, ConnectableObservable } from 'rxjs';
import { UserInfo } from 'fire-slack/app/interfaces';
// import { tag$ } from 'util/tags';

type UserInfoOperation = (msg: UserInfo[]) => UserInfo[];


@Injectable()
export class UserService {
  private operations$: Subject<UserInfoOperation>;
  private currentUserSource$: Subject<UserInfo>;

  currentUser$: ConnectableObservable<UserInfo>;
  users$: ConnectableObservable<UserInfo[]>;

  constructor() {
    this.currentUserSource$ = new Subject();
    this.currentUser$ = this.currentUserSource$.publishReplay(1);

    this.operations$ = new Subject();

    this.users$
      = this.operations$
          .scan(
            (users, operation) => operation(users),
            [] as UserInfo[]
          )
          .publishReplay(1);

    this.users$.connect();
  }

  setCurrentUser(user: UserInfo) {
    this.currentUser$.connect();
    this.currentUserSource$.next(user);
  }

  // addKnownUser(...user: User[]) {
  //   this.operations$.next(
  //     users => [...users, ...user]
  //   );
  // }
}
