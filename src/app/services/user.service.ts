import { Injectable } from '@angular/core';
import { Subject, ConnectableObservable } from 'rxjs';
import { User, UserListOperation } from 'fire-slack/app/interfaces';
// import { tag$ } from 'util/tags';



@Injectable()
export class UserService {
  private operations$: Subject<UserListOperation>;
  private currentUserSource$: Subject<User>;

  currentUser$: ConnectableObservable<User>;
  users$: ConnectableObservable<User[]>;

  constructor() {
    this.currentUserSource$ = new Subject();
    this.currentUser$ = this.currentUserSource$.publishReplay(1);

    this.operations$ = new Subject();

    this.users$
      = this.operations$
          .scan(
            (users, operation) => operation(users),
            [] as User[]
          )
          .publishReplay(1);

    this.users$.connect();
  }

  setCurrentUser(user: User) {
    this.currentUser$.connect();
    this.currentUserSource$.next(user);
  }

  addKnownUser(...user: User[]) {
    this.operations$.next(
      users => [...users, ...user]
    );
  }
}
