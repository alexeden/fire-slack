import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as Firebase from 'firebase';

@Injectable()
export class FirebaseService {

  app: Firebase.app.App;
  auth: Firebase.auth.Auth;
  database: Firebase.database.Database;
  storage: Firebase.storage.Storage;

  constructor() {
    this.app =
      Firebase.initializeApp({
        apiKey: 'AIzaSyDrjqFnQEWnQf827bIwedkpBn65SBiW64A',
        authDomain: 'fire-slack-c2735.firebaseapp.com',
        databaseURL: 'https://fire-slack-c2735.firebaseio.com',
        storageBucket: 'fire-slack-c2735.appspot.com',
        messagingSenderId: '915478226759'
      });

    this.auth = this.app.auth();
    this.database = this.app.database();
    this.storage = this.app.storage();

    this.auth.onAuthStateChanged(this.authStateChanged.bind(this));

    console.log(this.app);
  }

  signIn(): Observable<any> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return Observable.fromPromise(this.auth.signInWithPopup(provider) as Promise<any>);
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.auth.signOut() as Promise<any>);
  }

  private authStateChanged(...args: any[]) {
    console.log('authStateChanged args: ', args);
  }
}
