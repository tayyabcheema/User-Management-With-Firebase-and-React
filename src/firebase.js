import firebase from "firebase/compat/app"
import "firebase/compat/database"


const firebaseConfig = {
    apiKey: "AIzaSyA308mAq5xVHaqgTCBX0pLfuaDWfiwHkjE",
    authDomain: "users-data-4cf04.firebaseapp.com",
    projectId: "users-data-4cf04",
    storageBucket: "users-data-4cf04.appspot.com",
    messagingSenderId: "793886717796",
    appId: "1:793886717796:web:129969b516ac208106ac71"
  };

const fireDb= firebase.initializeApp(firebaseConfig)

export default fireDb.database().ref();