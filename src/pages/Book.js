import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './pageCSS/Book.css';
import { db } from '../firebase/firebaseConfig';
import bckGroundImg from '../assets/chill.png';

export default function Book() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = db
      .collection('posts')
      .doc(id)
      .onSnapshot(
        (doc) => {
          setData(doc.data());
        },
        (err) => {
          setError(err.message);
        }
      );

    return () => unsub();
  }, [id]);
  return (
    <div
      className="bookContainer"
      style={{ backgroundImage: `url(${bckGroundImg})` }}
    >
      {data && (
        <div className="inviBook">
          <h2>{data.title}</h2>
          <img src={data.imgSrc} alt="" />
          <p>Review: {data.review}</p>
        </div>
      )}
      <div>Comments:</div>
    </div>
  );
}
