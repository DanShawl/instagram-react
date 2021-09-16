import React, { useState } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';

const Post = ({ username, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="'static/images/avatar/1.jpg"
        />

        {/* Header > Avatar + Username */}
        <h3>{username}</h3>
      </div>
      {/* Image */}
      <img className="post__image" src={imageUrl} alt="" />
      {/* Username + Caption */}
      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
    </div>
  );
};

export default Post;
