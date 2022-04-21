import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCI9rT4Be1zNfEtEDRggYpjaXQju0VioGw', 
  authDomain: 'dfds-c9246.firebaseapp.com', 
  databaseURL: 'https://dfds-c9246.firebaseio.com', 
  projectId: 'dfds-c9246', 
  storageBucket: 'dfds-c9246.appspot.com', 
  messagingSenderId: '574319923169'
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new  firebase.auth.TwitterAuthProvider();
export const githubProvider = new  firebase.auth.GithubAuthProvider();
export const db =  firebase.firestore();

export default app;
