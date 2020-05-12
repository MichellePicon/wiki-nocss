import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyC3SsWo1sUxjWXF59b6uCuJtDb7tB5qi2s",
    authDomain: "wiki-14521.firebaseapp.com",
    databaseURL: "https://wiki-14521.firebaseio.com",
    projectId: "wiki-14521",
    storageBucket: "wiki-14521.appspot.com",
    messagingSenderId: "718327491861",
    appId: "1:718327491861:web:4ec2720847399389474d1c"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
