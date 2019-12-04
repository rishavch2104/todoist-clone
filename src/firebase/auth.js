import firebase from "./firebaseConnect";
import "firebase/auth";
import "firebase/firestore";

export const auth = firebase.auth();
export const db = firebase.firestore();

export const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password).then(res => {
    return res.user.uid;
  });
};

export const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password).then(res => {
    return res.user.uid;
  });
};

export const logoutUser = async () => {
  return await firebase.auth().signOut();
};
