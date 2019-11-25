import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCA1pesf05VTg9ng2OZ-39wxxgYefQreAY",
  authDomain: "todoist-2a059.firebaseapp.com",
  databaseURL: "https://todoist-2a059.firebaseio.com",
  projectId: "todoist-2a059",
  storageBucket: "todoist-2a059.appspot.com",
  messagingSenderId: "616680803756",
  appId: "1:616680803756:web:9c1021b11abf220d34be09",
  measurementId: "G-97JS12H9YR"
};

console.log("initializing firebase");
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
