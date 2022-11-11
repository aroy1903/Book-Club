import React, { useEffect } from 'react';
import './pageCSS/Home.css';
import Post from '../components/Post';
import bckGroundImg from '../assets/chill.png';
import { Link } from 'react-router-dom';
import useCollection from '../hooks/useCollection';

export default function Home() {
  const { error, pending, documents } = useCollection('posts', null, [
    'time',
    'desc',
  ]);

  return (
    <div className="homie" style={{ backgroundImage: `url(${bckGroundImg})` }}>
      {error && <h2>{error}</h2>}
      {documents &&
        documents.map((doc) => {
          return <Post key={doc.id} document={doc} />;
        })}
      <span className="addBook">
        <Link to="/newpost">+</Link>
      </span>
    </div>
  );
}
