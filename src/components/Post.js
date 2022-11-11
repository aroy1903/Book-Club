import { useState, useEffect, useRef } from 'react';
import './post.css';
import { useHistory } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
export default function Post({ document }) {
  const history = useHistory();
  const [upvotes, setUpvotes] = useState(0);
  const [click, setClickState] = useState(false);
  const [downVoteState, setDownvote] = useState(false);
  const { updateDoc, response } = useFirestore('posts');
  const downarr = useRef();
  const uparr = useRef();
  const { error } = response;

  useEffect(() => {
    setUpvotes(document.likes);
  }, []);

  const handleUp = () => {
    setUpvotes((prev) => prev + 1);
    console.log(upvotes);
    updateDoc(document.id, upvotes + 1);
    setClickState(true);
    setDownvote(false);
  };

  const handleDown = () => {
    setUpvotes((prev) => prev - 1);
    console.log(upvotes);
    updateDoc(document.id, upvotes - 1);
    setDownvote(true);
    setClickState(false);
  };

  return (
    <div className="postContainer">
      {error && <p>{error}</p>}
      {document && <h4>{document.title}</h4>}
      {document && (
        <img
          src={document.imgSrc}
          onClick={() => history.push(`/book/${document.id}`)}
          alt=""
        />
      )}
      <span className="author">By: {document && document.author}</span>
      <div className="likesComments">
        <div className="likes">
          <button ref={uparr} onClick={handleUp} disabled={click}>
            <span className="arrows material-symbols-outlined">
              arrow_upward
            </span>
          </button>

          <span>{document && document.likes}</span>
          <button ref={downarr} onClick={handleDown} disabled={downVoteState}>
            <span className="arrows material-symbols-outlined">
              arrow_downward
            </span>
          </button>
        </div>
        <span>Comments:</span>
      </div>
    </div>
  );
}
