import firebase from "./firebaseConnect";
import "firebase/auth";
import "firebase/firestore";

export const auth = firebase.auth();
export const db = firebase.firestore();

export const registerUser = async (email, password) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const loginUser = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const logoutUser = async () => {
  return await firebase.auth().signOut();
};

export const getUserData = async () => {
  let user = auth.currentUser;
  let name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  console.log(name, email, photoUrl, uid, emailVerified);
};
