import { UserContext } from '../context/userContext';
import { useContext } from 'react';

function useAuthContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('Context not accesible');
  }
  return context;
}

export { useAuthContext };
