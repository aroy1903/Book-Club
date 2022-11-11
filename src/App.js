import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Book from './pages/Book';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import { useAuthContext } from './hooks/useAuthContext';

import bckGroundImg from './assets/chill.png';
import MyPosts from './pages/MyPosts';
import PostForm from './pages/PostForm';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App" style={{ backgroundImage: `url(${bckGroundImg})` }}>
      {authIsReady && (
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/pages">
              {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/pages" /> : <Login />}
            </Route>
            <Route path="/book/:id">
              {user ? <Book /> : <Redirect to="/login" />}
            </Route>
            <Route path="/signup">
              {user ? <Redirect to="/pages" /> : <Signup />}
            </Route>
            <Route path="/myposts">
              {user ? <MyPosts /> : <Redirect to="/login" />}
            </Route>
            <Route path="/newpost">
              {user ? <PostForm /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
