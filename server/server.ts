import * as firebase from 'firebase-admin';
import * as serviceKey from './service-account-key.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceKey)
});
