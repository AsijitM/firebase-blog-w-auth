import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postCollectionref = collection(db, 'posts');
  let navigate = useNavigate();
  const createPost = async () => {
    await addDoc(postCollectionref, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  };
  //since the name of the variable is same as the name of the value we can use {title} instead {title:title}

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  },[]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A post</h1>
        <div className="inputGp">
          <label htmlFor="Title">Title</label>
          <input
            placeholder="Title..."
            type="text"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="Post">Post:</label>
          <textarea
            placeholder="Post..."
            cols="30"
            rows="10"
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post </button>
      </div>
    </div>
  );
}

export default CreatePost;
