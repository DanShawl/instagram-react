import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC8ximeiojzlP3kepVZdAs-pXD7O5KKQkM',

  authDomain: 'instagram-clone-react-e25b8.firebaseapp.com',

  projectId: 'instagram-clone-react-e25b8',

  storageBucket: 'instagram-clone-react-e25b8.appspot.com',

  messagingSenderId: '104084693822',

  appId: '1:104084693822:web:8ed473f4c67c15ae4d426f',

  measurementId: 'G-GSZR52LP8T',
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// const docCol = collection(db, 'posts');

export { db, auth, storage };

//  Attempt 4
// import * as firebase from 'firebase';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC8ximeiojzlP3kepVZdAs-pXD7O5KKQkM',

//   authDomain: 'instagram-clone-react-e25b8.firebaseapp.com',

//   projectId: 'instagram-clone-react-e25b8',

//   storageBucket: 'instagram-clone-react-e25b8.appspot.com',

//   messagingSenderId: '104084693822',

//   appId: '1:104084693822:web:8ed473f4c67c15ae4d426f',

//   measurementId: 'G-GSZR52LP8T',
// }; // apiKey, authDomain, etc. (see above)

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

// export { db };

//  Attempt 1

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// import firebase from 'firebase';

// const firebaseApp = firebase.initializeApp({
//   apiKey: 'AIzaSyC8ximeiojzlP3kepVZdAs-pXD7O5KKQkM',

//   authDomain: 'instagram-clone-react-e25b8.firebaseapp.com',

//   projectId: 'instagram-clone-react-e25b8',

//   storageBucket: 'instagram-clone-react-e25b8.appspot.com',

//   messagingSenderId: '104084693822',

//   appId: '1:104084693822:web:8ed473f4c67c15ae4d426f',

//   measurementId: 'G-GSZR52LP8T',
// });

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };
//  Attempt 2 ------------------------------------------------------
// import firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// // import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC8ximeiojzlP3kepVZdAs-pXD7O5KKQkM',

//   authDomain: 'instagram-clone-react-e25b8.firebaseapp.com',

//   projectId: 'instagram-clone-react-e25b8',

//   storageBucket: 'instagram-clone-react-e25b8.appspot.com',

//   messagingSenderId: '104084693822',

//   appId: '1:104084693822:web:8ed473f4c67c15ae4d426f',

//   measurementId: 'G-GSZR52LP8T',
// };

// const app = initializeApp(firebaseConfig);

// // const db = firebase.firestore();
// const db = app.firestore();

// export db;

// import firebase from 'firebase/compat/app';
// // import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC8ximeiojzlP3kepVZdAs-pXD7O5KKQkM',

//   authDomain: 'instagram-clone-react-e25b8.firebaseapp.com',

//   projectId: 'instagram-clone-react-e25b8',

//   storageBucket: 'instagram-clone-react-e25b8.appspot.com',

//   messagingSenderId: '104084693822',

//   appId: '1:104084693822:web:8ed473f4c67c15ae4d426f',

//   measurementId: 'G-GSZR52LP8T',
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebaseConfig.firestore(); //  used to access db

// export { db };

// export default firebase;
