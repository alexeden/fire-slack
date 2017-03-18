import { Injectable } from '@angular/core';
import { Subject, ConnectableObservable } from 'rxjs';
import { User } from './interfaces';
import { tag$ } from 'util/tags';



@Injectable()
export class UserService {
  private currentUserSource$: Subject<User>;
  currentUser$: ConnectableObservable<User>;

  constructor() {
    this.currentUserSource$ = new Subject();
    this.currentUser$ = this.currentUserSource$.do(tag$('current user')).publishReplay(1);
  }

  setCurrentUser(user: User) {
    this.currentUserSource$.next(user);
    this.currentUser$.connect();
  }
}
