import React from 'react';
import '../components/navbar.css';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const { user } = useAuthContext();
  const { error, logout } = useLogout();

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <h2>
              <Link to="/">Book Club</Link>
            </h2>
          </li>
          <div className="links" style={user ? { width: 500 } : { width: 170 }}>
            <li>{!user && <Link to="/login">Login</Link>}</li>
            <li>{!user && <Link to="/signup">Sign Up</Link>}</li>
            {user && (
              <li>
                <p className="userWelcome">
                  Welcome , {user.displayName && user.displayName}!
                </p>
              </li>
            )}
            {user && (
              <li>
                <Link to="/pages">
                  <p>Home</p>
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/myposts">
                  <p>My Posts</p>
                </Link>
              </li>
            )}
            <li>
              {user && (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
