import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDNJgHOL2_o6z3mWkm9pRabe4b_HzPfSiU",
    authDomain: "perguntasehrespostas.firebaseapp.com",
    databaseURL: "https://perguntasehrespostas-default-rtdb.firebaseio.com",
    projectId: "perguntasehrespostas",
    storageBucket: "perguntasehrespostas.appspot.com",
    messagingSenderId: "697370271463",
    appId: "1:697370271463:web:e05e70fa3a798e68428c42"
};

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
