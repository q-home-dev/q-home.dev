// import Vue from "vue";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA67Jkxzv9wNLFUBsrCpnibE5d0G7ehLUc",
  authDomain: "qhome-dev.firebaseapp.com",
  databaseURL: "https://qhome-dev.firebaseio.com",
  projectId: "qhome-dev",
  storageBucket: "qhome-dev.appspot.com",
  messagingSenderId: "767371983152",
  appId: "1:767371983152:web:bacb8f9fc6b2e0a6ecb0f5",
  measurementId: "G-86G7B7QN51"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

export const db = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

// new Vue({
//   // setup the reactive todos property
//   data: () => ({ users: [] }),

//   firestore: {
//     users: db.collection("users")
//   }
// });
