import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC21oFcrFf1vWfmmWWyvBnMZ1zvLBe-e00",
    authDomain: "test-101fd.firebaseapp.com",
    databaseURL: "https://test-101fd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-101fd",
    storageBucket: "test-101fd.appspot.com",
    messagingSenderId: "386267644838",
    appId: "1:386267644838:web:48444c6c4546d857828567"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
