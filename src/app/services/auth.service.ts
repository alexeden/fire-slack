import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, ConnectableObservable } from 'rxjs';
import * as Firebase from 'firebase';
import { tag$ } from 'fire-slack/util/tags';
import { UserInfo, Auth, User } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';


@Injectable()
export class AuthService {

  private auth: Auth;
  private authStateSubject$ = new Subject<User | null>();
  authState$: ConnectableObservable<User>;
  isLoggedIn$: Observable<boolean>;
  loggedInNotifier$: Observable<User>;
  loggedOutNotifier$: Observable<User>;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService
  ) {
    this.auth = this.firebaseService.app.auth();
    this.authState$ = this.authStateSubject$.publishReplay(1);

    this.auth.onAuthStateChanged((authState: any) =>
      this.authStateSubject$.next(authState)
    );

    this.isLoggedIn$ = this.authState$.map(user => user !== null);

    this.loggedInNotifier$
      = this.authState$.pairwise()
          .filter(([was, is]) => was === null && !!is)
          .map(([, is]) => is);

    this.loggedOutNotifier$
      = this.authState$.pairwise()
          .filter(([was, is]) => !!was && is === null)
          .map(([was]) => was);

    this.authState$.connect();
  }

  signInWithGoogle(): Observable<any> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return Observable.fromPromise(this.auth.signInWithPopup(provider) as Promise<any>);
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.auth.signInWithEmailAndPassword(email, password) as Promise<any>);
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.auth.signOut() as Promise<any>);
  }
}
