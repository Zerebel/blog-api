import { createContext, useEffect, useState } from "react";
import { auth } from "./Config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import useLocalStorage from "./use-local-storage";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signUp = async (email, password, location) => {
    setLoading(true);
    setError(null);
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        return "/";
      })
      .catch(() => {
        setError("Unable to create user");
        setLoading(false);
        return location;
      });
  };

  const signIn = async (email, password, location) => {
    setLoading(true);
    setError(null);
    return await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        return "/";
      })
      .catch(() => {
        setError("Invalid email or password");
        setLoading(false);
        return location;
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

  const signInWithGoogle = async ({ location }) => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
        return "/";
      })
      .catch(() => {
        setError("Authentication failed");
        setLoading(false);
        return location;
      });
  };

  const signInWithGithub = async ({ location }) => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      allow_signup: "false",
    });
    return await signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
        return "/";
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError("Authentication failed");
        if (errorMessage.includes("account-exists"))
          setError("Account exists with different credential");
        setLoading(false);
        return location;
      });
  };

  const verifyEmail = async () => {
    await sendEmailVerification(auth.currentUser);
    return setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const value = {
    currentUser,
    loading,
    setLoading,
    signIn,
    signUp,
    setNewEmail,
    setNewPassword,
    signOut_,
    error,
    setError,
    signInWithGoogle,
    signInWithGithub,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
