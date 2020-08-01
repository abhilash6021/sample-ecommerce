import * as firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAqzUeUOMhKzwSH4djPYj8vM1FfBMCBpTQ",
  authDomain: "crwn-db-772a8.firebaseapp.com",
  databaseURL: "https://crwn-db-772a8.firebaseio.com",
  projectId: "crwn-db-772a8",
  storageBucket: "crwn-db-772a8.appspot.com",
  messagingSenderId: "214559914283",
  appId: "1:214559914283:web:c28d934e323ffebb5b2d6e",
  measurementId: "G-9FR9RCRNT0",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // userRef is the documentRef and we can retrive data(snapshot) in that document by get method like userRef.get

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
