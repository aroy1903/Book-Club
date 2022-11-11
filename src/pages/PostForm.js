import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './pageCSS/PostForm.css';
import useFirestore from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

export default function PostForm() {
  const { addDoc, response } = useFirestore('posts');
  const { user } = useAuthContext();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const { error, success } = response;
  const history = useHistory();

  const getBookCover = async (author, title) => {
    const urlAuthor = author.split(' ').join('+');
    const urlTitle = title.split(' ').join('+');
    console.log(urlTitle, urlAuthor);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${urlTitle}&inauthor:${urlAuthor}`
    );
    const data = await response.data;
    const imageSrc = await data.items[0].volumeInfo.imageLinks.thumbnail;
    return imageSrc;
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const image = await getBookCover(author, title);
    addDoc({ author, title, review, imgSrc: image, uid: user.uid, likes: 0 });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => history.push('/pages'), 2000);
    }
    if (error) {
      setAuthor('');
      setTitle('');
      setReview('');
    }
  }, [success, history, error]);

  return (
    <div className="newPostContainer">
      <div className="newPost formContainer">
        <h2>New Post</h2>
        {error && <span>{error}</span>}
        <form>
          <label>
            <span>book name:</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>author:</span>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            <span>review:</span>
            <textarea
              cols="50"
              rows="10"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </label>
          <button className="submitBtn" onClick={handlePost} type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
