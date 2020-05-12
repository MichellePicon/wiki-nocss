import app from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyC3SsWo1sUxjWXF59b6uCuJtDb7tB5qi2s",
    authDomain: "wiki-14521.firebaseapp.com",
    databaseURL: "https://wiki-14521.firebaseio.com",
    projectId: "wiki-14521",
    storageBucket: "wiki-14521.appspot.com",
    messagingSenderId: "718327491861",
    appId: "1:718327491861:web:4ec2720847399389474d1c"
};
 
class Firebase {
  constructor() {
    if (!app.apps.length) {
        app.initializeApp(config);
     }
     this.auth = app.auth();
     this.firestore = app.firestore();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
     
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    firestored = () => this.firestore.collection("notes");
    firestorec = () => this.firestore.collection("categorias");
    users = () => this.auth;
}
 
export default Firebase;