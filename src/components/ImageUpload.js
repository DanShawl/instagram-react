import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from '../firebase';
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  FieldValue,
} from 'firebase/firestore';

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  // const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  //  sets image to the first image selected
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, `image/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      'state_changed',
      //  progress function
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      //  error function
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        //  complete function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //  post image inside db
          console.log('File is available at ' + downloadURL);
          const docRef = doc(collection(db, 'posts'));
          setDoc(docRef, {
            timestamp: serverTimestamp(FieldValue),
            caption: caption,
            imageUrl: downloadURL,
            username: username,
          });
          // collection(db, 'posts').add({
          //   caption: caption,
          //   imageUrl: downloadURL,
          //   username: username,
          // });
          setProgress(0);
          setCaption('');
          setImage(null);
        });
      }
    );

    // const uploadTask = ref(storage, `image/${image.name}`).put(image);
  };
  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
      {/* progress bar */}
      {/* caption */}
      {/* file picker */}
      {/* post button */}
    </div>
  );
};

export default ImageUpload;
