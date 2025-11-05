import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, database } from '../firebase/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from database
        try {
          const userRef = ref(database, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);
          const userData = snapshot.val();

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  };

  const signup = async (email, password, { fullName, role }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const userRef = ref(database, `users/${uid}`);
    await set(userRef, {
      email,
      full_name: fullName || email,
      role: role || 'receiver',
      created_date: new Date().toISOString(),
    });
    return cred.user;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // Optional: restrict to your web client ID audience if needed
    const result = await signInWithPopup(auth, provider);
    const { user: gUser } = result;

    // Ensure a DB record exists
    const userRef = ref(database, `users/${gUser.uid}`);
    const snap = await get(userRef);
    if (!snap.exists()) {
      await set(userRef, {
        email: gUser.email,
        full_name: gUser.displayName || gUser.email,
        role: 'receiver',
        created_date: new Date().toISOString(),
      });
    }
    return gUser;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, login, signup, loginWithGoogle, logout };
};

