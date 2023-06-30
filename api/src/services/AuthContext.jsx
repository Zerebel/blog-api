import { createContext, useEffect, useState } from "react";
import { app } from "./Config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  updateEmail,
  updatePassword,
  signOut,
} from "firebase/auth";
import useLocalStorage from "./use-local-storage";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const auth = getAuth(app);

  const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(() => setError(false))
      .catch(() => setError("Invalid email or password"));
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(() => setError(false))
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  const setNewEmail = async (email) => {
    return await updateEmail(currentUser, email)
      .then(() => setError(false))
      .catch(() => setError("Error updating email"));
  };

  const setNewPassword = async (password) => {
    return await updatePassword(currentUser, password)
      .then(() => setError(false))
      .catch(() => setError("Error updating password"));
  };

  const signOut_ = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [auth, setCurrentUser]);

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    setNewEmail,
    setNewPassword,
    signOut_,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
