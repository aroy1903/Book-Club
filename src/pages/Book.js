import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './pageCSS/Book.css';
import { db } from '../firebase/firebaseConfig';
import bckGroundImg from '../assets/chill.png';
import { useAuthContext } from '../hooks/useAuthContext';
import useFirestore from '../hooks/useFirestore';
import useCollection from '../hooks/useCollection';
import Comment from '../components/Comment';
export default function Book() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [comment, setComment] = useState('');
  const { addDoc, response } = useFirestore('comments');
  const {
    documents,
    error: collectionErr,
    pending: collectionPending,
  } = useCollection('comments', ['docId', '==', id], ['time', 'desc']);

  const { error: fetchErr, pending: loading, success } = response;

  useEffect(() => {
    setPending(true);
    const unsub = db
      .collection('posts')
      .doc(id)
      .onSnapshot(
        (doc) => {
          setData(doc.data());
          setPending(false);
        },
        (err) => {
          setError(err.message);
          setPending(false);
        }
      );

    return () => unsub();
  }, [id]);

  useEffect(() => {
    if (success) {
      setComment('');
    }
  }, [success]);

  const handleSubmit = () => {
    addDoc({ comment, docId: id, displayName: user.displayName });
  };

  return (
    <div
      className="bookContainer"
      style={{ backgroundImage: `url(${bckGroundImg})` }}
    >
      {error && <h2>{error}</h2>}
      {fetchErr && <h2>{fetchErr}</h2>}
      {collectionErr && <h2>{collectionErr}</h2>}
      {pending && <h2>Loading...</h2>}
      {data && (
        <div className="inviBook">
          <div className="inviContainer">
            <h2>{data.title}</h2>
            <img src={data.imgSrc} alt="" />
            <div className="revInfo">
              <span>Author: {data.author}</span>
              <span>Likes: {data.likes}</span>
              {documents && <span> Comments: {documents.length}</span>}
            </div>

            <p>Review: {data.review}</p>
          </div>
        </div>
      )}
      <div className="comments">
        <h4>Comment: </h4>
        <textarea
          cols="40"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="submitBtn" onClick={handleSubmit}>
          Post
        </button>
      </div>
      {documents &&
        documents.map((doc) => <Comment key={doc.id} document={doc} />)}
    </div>
  );
}
