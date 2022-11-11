import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useFirestore from '../hooks/useFirestore';

export default function UserPost({ document }) {
  const { deleteDoc, response } = useFirestore('posts');
  const { user } = useAuthContext();
  const { error, success } = response;

  const generatePostId = () => {
    const docId = document.id;
    const userId = user.uid;
    return userId.substring(20) + docId.substring(15);
  };

  const handleClick = () => {
    deleteDoc(document.id);
    window.localStorage.removeItem(generatePostId() + 1);
    window.localStorage.removeItem(generatePostId() + 2);
  };

  return (
    <div className="userpostContainer">
      {document && <h4>{document.title}</h4>}
      {document && <img src={document.imgSrc} alt="" />}
      <span className="author">By: {document && document.author}</span>
      <span
        className="material-symbols-outlined userDelete"
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  );
}
