import * as firebase from 'firebase';
import * as moment from 'moment';

const config = {
  apiKey: 'AIzaSyDrjqFnQEWnQf827bIwedkpBn65SBiW64A',
  authDomain: 'fire-slack-c2735.firebaseapp.com',
  databaseURL: 'https://fire-slack-c2735.firebaseio.com',
  storageBucket: 'fire-slack-c2735.appspot.com',
  messagingSenderId: '915478226759'
};

firebase.initializeApp(config);

console.log(moment);
