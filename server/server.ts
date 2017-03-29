import * as firebase from 'firebase-admin';
import * as serviceKey from './service-account-key';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceKey)
});

console.log('firebase app initialized');
