import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useCollection from '../hooks/useCollection';
import UserPost from '../components/UserPost';
import bckGroundImg from '../assets/chill.png';
import { Link } from 'react-router-dom';

export default function MyPosts() {
  const { user } = useAuthContext();
  const { error, pending, documents } = useCollection(
    'posts',
    ['uid', '==', user.uid],
    ['time', 'desc']
  );
  return (
    <div className="homie" style={{ backgroundImage: `url(${bckGroundImg})` }}>
      {error && <p>{error}</p>}
      {documents &&
        documents.map((doc) => <UserPost document={doc} key={doc.id} />)}
      <span className="addBook">
        <Link to="/newpost">+</Link>
      </span>
    </div>
  );
}
