import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import './pageCSS/Login.css';
import bckGroundImg from '../assets/chill.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyForm, setEmptyForm] = useState(false);
  const { error, pending, login } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();
    setEmptyForm(false);
    if (email === '' || password === '') {
      setEmptyForm(true);
      setTimeout(() => setEmptyForm(false), 3000);
      return;
    }
    login(email, password);
    if (error) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="main" style={{ backgroundImage: `url(${bckGroundImg})` }}>
      <div className="formContainer">
        <h2>Login</h2>
        <form action="">
          {emptyForm && <p>Missing email or password</p>}
          {error && <p>{error}</p>}
          <label>
            <span>email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <button className="submitBtn" onClick={handleClick}>
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
