import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.log(error.message);
      if (!cancelled) setError(error.message);
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);
  return { error, logout };
};
