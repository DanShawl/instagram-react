import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore';

const Post = ({ username, caption, imageUrl, postId, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const postsRef = doc(db, 'posts', postId);
    let unsubscribe;
    if (postId) {
      unsubscribe = onSnapshot(collection(postsRef, 'comments'), (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    const postRef = doc(db, 'posts', postId);
    const commentsRef = collection(postRef, 'comments');
    console.log(commentsRef);
    addDoc(commentsRef, {
      text: comment,
      username: user.displayName,
    });
    setComment('');
  };
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

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form action="" className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
