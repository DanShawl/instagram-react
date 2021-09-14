import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';

// import * as firebase from 'firebase';

// import firebase from 'firebase/compat/app';
import {
  collection,
  // doc,
  // setDoc,
  // getDocs,
  // addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

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
