// firebase/auth.js
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig"; // connect to firebaseConfig.js

const auth = getAuth(app);

// sign in your account
export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("Sign In Successful");
  } catch (error) {
    console.error("Fail to Sign In:", error.message);
  }
};

// login your account
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful");
  } catch (error) {
    console.error("Fail to Login:", error.message);
  }
};

export default auth;
