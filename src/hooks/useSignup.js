import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    if (!cancelled) {
      setError(null);
      setPending(true);
    }
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error('Could not complete signup');
      }
      res.user.updateProfile({ displayName });
      dispatch({ type: 'LOGIN', payload: res.user });
      if (!cancelled) setPending(false);
    } catch (err) {
      if (!cancelled) {
        console.log(err.message);
        setError(err.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);
  return { error, pending, signup };
};

export default useSignup;
