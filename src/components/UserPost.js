import { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';

export default function UserPost({ document }) {
  const { deleteDoc, response } = useFirestore('posts');
  const { error, success } = response;
  const handleClick = () => {
    deleteDoc(document.id);
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
