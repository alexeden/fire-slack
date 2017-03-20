import { Injectable } from '@angular/core';
import { Subject, ConnectableObservable } from 'rxjs';
import { User } from 'app/interfaces';
// import { tag$ } from 'util/tags';



@Injectable()
export class UserService {
  private currentUserSource$: Subject<User>;
  currentUser$: ConnectableObservable<User>;

  constructor() {
    this.currentUserSource$ = new Subject();
    this.currentUser$ = this.currentUserSource$.publishReplay(1);
  }

  setCurrentUser(user: User) {
    this.currentUser$.connect();
    this.currentUserSource$.next(user);
  }
}
