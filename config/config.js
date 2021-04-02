import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAbMFEXYzIMiDbfzO5rfc1vvUS5ng3TTcg",
    authDomain: "lista-de-linguagens.firebaseapp.com",
    databaseURL: "https://lista-de-linguagens.firebaseio.com",
    projectId: "lista-de-linguagens",
    storageBucket: "",
    messagingSenderId: "916804943247",
    appId: "1:916804943247:web:5f55d97edf11aee8"
};

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
