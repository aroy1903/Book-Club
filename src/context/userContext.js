import { createContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/firebaseConfig';

export const UserContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTHISREADY':
      return { ...state, authIsReady: true, user: action.payload };
    default:
      return state;
  }
};

export const User = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTHISREADY', payload: user });
      unsub();
    });
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
