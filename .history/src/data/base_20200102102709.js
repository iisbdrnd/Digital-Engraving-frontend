import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId:""
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new  firebase.auth.TwitterAuthProvider();
export const githubProvider = new  firebase.auth.GithubAuthProvider();
export const db =  firebase.firestore();

export default app;
