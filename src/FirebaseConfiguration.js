import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2BNBRzaj2YUAhpLlihpJlnb4GJ__pBlo",
  authDomain: "itla-31d00.firebaseapp.com",
  projectId: "itla-31d00",
  storageBucket: "itla-31d00.appspot.com",
  messagingSenderId: "107499615924",
  appId: "1:107499615924:web:36bbc3fcb8d46fc01fc9e1",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
