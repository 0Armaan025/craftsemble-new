
import { addDoc, collection } from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8ht5dqhDQxpDKsJIpzidwyAi_ZPeD5go",
    authDomain: "craftsemble-172ed.firebaseapp.com",
    projectId: "craftsemble-172ed",
    storageBucket: "craftsemble-172ed.appspot.com",
    messagingSenderId: "337277359084",
    appId: "1:337277359084:web:f8341924ffd663987866c9",
    measurementId: "G-31Y691HHBK"
  };

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const firestore = getFirestore(app)
    export const newStorage = getStorage(app);


