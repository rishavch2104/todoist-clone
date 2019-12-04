import firebase from "./firebaseConnect";
import "firebase/auth";
import "firebase/firestore";

export const auth = firebase.auth();
export const db = firebase.firestore();

export const registerUser = async (email, password) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password).then(res => {
    let user = firebase.auth().currentUser;
    let name, email, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;

      uid = user.uid;
    }
    console.log(uid);
    return { name, email, uid };
  });
};

export const logoutUser = async () => {
  return await firebase.auth().signOut();
};

export const getUserData = () => {};
