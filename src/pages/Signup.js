import { useState } from 'react';
import './pageCSS/Signup.css';
import useSignup from '../hooks/useSignup';
import bckGroundImg from '../assets/chill.png';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [emptyForm, setEmptyForm] = useState(false);

  const { error, pending, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '' || displayName === '') {
      setEmptyForm(true);
      setTimeout(() => setEmptyForm(false), 3000);
      return;
    }
    signup(email, password, displayName);
  };
  return (
    <div className="signup" style={{ backgroundImage: `url(${bckGroundImg})` }}>
      <div className="signupContainer">
        <h2>Signup</h2>
        <form>
          {emptyForm && <p>Missing a required field</p>}
          {error && <p>{error}</p>}
          <label>
            <span>email:</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>password:</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <label>
            <span>display name:</span>
            <input
              required
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            ></input>
          </label>
          <button className="submitBtn" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
