import { useState, useEffect, useRef, useCallback } from 'react';
import './post.css';
import { useHistory } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Post({ document }) {
  const { user } = useAuthContext();
  const generatePostId = useCallback(() => {
    const docId = document.id;
    const userId = user.uid;

    return userId.substring(20) + docId.substring(15);
  });
  const history = useHistory();
  const initialClick =
    JSON.parse(window.localStorage.getItem(generatePostId() + 1)) || false;
  const initialDownvote =
    JSON.parse(window.localStorage.getItem(generatePostId() + 2)) || false;
  const [upvotes, setUpvotes] = useState(0);
  const [click, setClickState] = useState(initialClick);
  const [downVoteState, setDownvote] = useState(initialDownvote);
  const { updateDoc, response } = useFirestore('posts');
  const downarr = useRef();
  const uparr = useRef();
  const { error } = response;

  useEffect(() => {
    setUpvotes(document.likes);
  }, [document.likes]);

  useEffect(() => {
    window.localStorage.setItem(generatePostId() + 1, click);
    window.localStorage.setItem(generatePostId() + 2, downVoteState);
  }, [click, downVoteState, generatePostId]);

  const handleUp = () => {
    setUpvotes((prev) => prev + 1);
    updateDoc(document.id, upvotes + 1);
    setClickState(true);
    setDownvote(false);
  };

  const handleDown = () => {
    setUpvotes((prev) => prev - 1);
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
          <button
            className="likesButtons"
            ref={uparr}
            onClick={handleUp}
            disabled={click}
          >
            <span className="arrows material-symbols-outlined">
              arrow_upward
            </span>
          </button>

          <span>{document && document.likes}</span>
          <button
            className="likesButtons"
            ref={downarr}
            onClick={handleDown}
            disabled={downVoteState}
          >
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
