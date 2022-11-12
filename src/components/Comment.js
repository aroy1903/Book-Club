import React from 'react';
import './comment.css';

export default function Comment({ document }) {
  return (
    <div className="commen">
      {document && <h4>{document.displayName}: </h4>}
      {document && <span>{document.comment}</span>}
    </div>
  );
}
