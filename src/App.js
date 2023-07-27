import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./containers/Main";
import Login from "./containers/Login";
import { app } from "./config/firebase.config";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { validateUserJWTToken } from "./api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import MainLoader from "./components/MainLoader";
import Alert from "./components/Alert"
import Dashboard from "./containers/Dashboard";
const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            
            
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UsersOrder />} />  */}
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
