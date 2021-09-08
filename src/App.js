import React, { useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: 'danshawl',
      caption: 'A wonderful post',
      imageUrl:
        'https://images.pexels.com/photos/634030/pexels-photo-634030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      username: 'danshawl',
      caption: 'A wonderful post',
      imageUrl:
        'https://images.pexels.com/photos/634030/pexels-photo-634030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
  ]);

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
      {posts.map((post) => {
        return (
          <Post
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

//  Object-fit: contain prevents stretching of images
//  ColorZilla chrome ext for color picking
//  Type the component name then ctrl + space to auto complete import

//  Create layout inside of app.js with comments
//  Create a posts component (post header w/ ava + username, image, )
//  Pass down post information as a prop
//  Create a hardcoded array of objects defining username, caption, image
//  Map over that array to render the list of posts
