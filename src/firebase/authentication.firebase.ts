/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "./firebase.config";

export const FirebaseSignupAsync = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      data: userCredential.user,
    };
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    return {
      success: false,
      data: error.message,
    };
  }
};

export const FirebaseLoginAsync = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      data: userCredential.user,
    };
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    return {
      success: false,
      data: error.message,
    };
  }
};
