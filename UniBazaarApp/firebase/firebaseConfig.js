import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBORE111IqS2T5_p1sT4bIrt_RJIaVjxg",
  authDomain: "unibazaar-ff839.firebaseapp.com",
  projectId: "unibazaar-ff839",
  storageBucket: "unibazaar-ff839.appspot.com",
  messagingSenderId: "795443692801",
  appId: "1:795443692801:web:5e688a2a9e41611820700",
  measurementId: "G-P74YLDGWMP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
