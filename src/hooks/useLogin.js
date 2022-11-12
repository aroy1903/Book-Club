import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    if (!cancelled) {
      setError(null);
      setPending(true);
    }
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error('Please try again');
      }
      dispatch({ type: 'LOGIN', payload: res.user });
      setPending(false);
    } catch (err) {
      if (!cancelled) {
        if (
          err.message ===
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          setError('Incorrect email or password');
        } else {
          setError(err.message);
        }
        setPending(false);
      }
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);

  return { error, pending, login };
};

export default useLogin;
