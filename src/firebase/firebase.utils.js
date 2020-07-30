import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAqzUeUOMhKzwSH4djPYj8vM1FfBMCBpTQ",
    authDomain: "crwn-db-772a8.firebaseapp.com",
    databaseURL: "https://crwn-db-772a8.firebaseio.com",
    projectId: "crwn-db-772a8",
    storageBucket: "crwn-db-772a8.appspot.com",
    messagingSenderId: "214559914283",
    appId: "1:214559914283:web:c28d934e323ffebb5b2d6e",
    measurementId: "G-9FR9RCRNT0"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

  export default firebase;