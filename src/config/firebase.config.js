import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTKv_yW3DoYrJznutEpzxHKBmN5EsiOqA",
  authDomain: "fullstack-app-july-13-reactjs.firebaseapp.com",
  projectId: "fullstack-app-july-13-reactjs",
  storageBucket: "fullstack-app-july-13-reactjs.appspot.com",
  messagingSenderId: "822596507982",
  appId: "1:822596507982:web:0ea41b3c0340d845a3661f",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
