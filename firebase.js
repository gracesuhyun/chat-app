import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    databaseURL: "chat-app-b0680.firebaseio.com",
    apiKey: "AIzaSyCySJTysG-rullhFQttw8hFAdoRTRcg1Ec",
    authDomain: "chat-app-b0680.firebaseapp.com",
    projectId: "chat-app-b0680",
    storageBucket: "chat-app-b0680.appspot.com",
    messagingSenderId: "707100552837",
    appId: "1:707100552837:web:47a613d1c7253c42ab03ec",
    measurementId: "G-KLSCV8FY1Z"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app()
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth} ;