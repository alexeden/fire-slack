import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, ConnectableObservable } from 'rxjs';
import * as Firebase from 'firebase';
import { tag$ } from 'fire-slack/util/tags';
import { FirebaseService, UserInfo, Auth } from './firebase.service';


@Injectable()
export class AuthService {

  private auth: Auth;
  user$: ConnectableObservable<UserInfo>;
  isLoggedIn$: Observable<boolean>;
  private authState$ = new Subject<UserInfo>();

  constructor(
    @Inject(FirebaseService) private firebase: FirebaseService
  ) {
    this.auth = this.firebase.app.auth();
    this.auth.onAuthStateChanged((authState: any) => this.authState$.next(authState));
    this.user$
      = this.authState$.asObservable()
          .do(tag$('user$'))
          .startWith(this.auth.currentUser)
          .publishReplay();

    this.isLoggedIn$ = this.user$.map(user => user !== null);
    this.user$.connect();
  }

  signIn(): Observable<any> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return Observable.fromPromise(this.auth.signInWithPopup(provider) as Promise<any>);
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.auth.signOut() as Promise<any>);
  }
}
