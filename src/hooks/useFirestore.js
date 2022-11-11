import { useState, useEffect, useReducer } from 'react';
import { db, timestamp } from '../firebase/firebaseConfig';
let initialState = {
  pending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'ISPending':
      return { ...state, pending: true, error: null };
    case 'ADDDOC':
      return { ...state, pending: false, error: null, success: true };
    case 'DELETEDOC':
      return { ...state, pending: false, error: null, success: true };
    case 'UPDATEDOC':
      return { ...state, pending: false, error: null, success: true };
    case 'ERROR':
      return { pending: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export default function useFirestore(collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  const ref = db.collection(collection);

  const dispatchNotCancelled = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const addDoc = async (doc) => {
    dispatchNotCancelled({ type: 'ISPending' });
    try {
      const time = timestamp.fromDate(new Date());
      await ref.add({ ...doc, time });
      dispatchNotCancelled({ type: 'ADDDOC' });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  const deleteDoc = async (id) => {
    dispatchNotCancelled({ type: 'ISPending' });
    try {
      await ref.doc(id).delete();
      dispatchNotCancelled({ type: 'DELETEDOC' });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  const updateDoc = async (id, data) => {
    dispatchNotCancelled({ type: 'ISPending' });
    try {
      await ref.doc(id).update({ likes: data });
      dispatchNotCancelled({ type: 'ADDDOC' });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);

  return { response, updateDoc, addDoc, deleteDoc };
}
