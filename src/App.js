import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input, InputLabel, TextField } from '@material-ui/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  //  Listens for anytime any authentication change happens: logins, logout, etc. Returns an authUser, see the docs:
  // https://firebase.google.com/docs/reference/js/firebase.User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //  user signs in
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
        //  User signs out out
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  // Storing the array of posts from db to the posts state
  useEffect(() => {
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  // Function handeling user creation
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser.user, {
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  //  Function handeling user sign in
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );

    setOpenSignIn(false);
  };
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            {/* <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn} type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={() => signOut(auth)}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      {/* Rendering a list of posts */}
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}
    </div>
  );
}
//  https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png
export default App;

//  Notes

//  TRANSFERRING PATIENTS INFO:
//    i might be able to transfer info by appending the db path of their info to another database
//    each physiologist would have an account containing patients

//  Object-fit: contain prevents stretching of images
//  ColorZilla chrome ext for color picking
//  Type the component name then ctrl + space to auto complete import
//  db.collection('posts') -- accesses posts from db
//  .onSnapshot(snapshot => {}) -- very powerful listener
//      everytime the db changes in that collection, it will take a snapshot of it and fire the code inside the function
//  setPosts(snapshot.docs.map()) this will map through each document in the posts db
//  doc => doc.data() will give us all the properties in the document
//  If we make the snapshot returned values for each doc an object, we need to destructure them into the jsx
//  ** Adding a key will prevent it from being rerendered

//  Steps:

//  Create layout inside of app.js with comments
//  Create a posts component (post header w/ ava + username, image, )
//  Pass down post information as a prop
//  Create a hardcoded array of objects defining username, caption, image
//  Map over that array to render the list of posts

//  create firebase project (testmode)
//  create a firebase.js file and use config file
//  useEffect with db to set each post to the posts array

//  useEffect(() => {
//   onSnapshot(collection(db, 'posts'), (snapshot) => {
//     setPosts(snapshot.docs.map((doc) => doc.data()));
//   });
// }, []);

// useEffect(() => {
//   db.onSnapshot((snapshot) => {
//     setPosts(snapshot.docs.map((doc) => doc.data()));
//   });
// }, []);

// const postsRef = collection(db, 'posts');
// const helper = async () => {
//   const docRef = collection(db, 'posts');
//   const docSnap = await getDocs(docRef);
//   console.log(docSnap.data);
// };
// helper();

// const helper = async () => {
//   const docSnap = await getDoc(docRef);
//   console.log(docSnap.data({}));
// };
// helper();
// const postsRef = collection(db, 'posts')
// db.collection('posts').onSnapshot((snapshot) => {
//   setPosts(snapshot.docs.map((doc) => doc.data()));
// });
