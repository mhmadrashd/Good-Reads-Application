import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDfes9PTd4UcsTsSRHIg9XNapYZ9mXM56I",
    authDomain: "goodreadsapplication.firebaseapp.com",
    projectId: "goodreadsapplication",
    storageBucket: "goodreadsapplication.appspot.com",
    messagingSenderId: "989913257633",
    appId: "1:989913257633:web:3fe13d2a537b14075142e0"
};

const appFirebase = initializeApp(firebaseConfig);
export const storage = getStorage(appFirebase);