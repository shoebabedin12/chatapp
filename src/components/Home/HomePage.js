import { Alert } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './homepage.css';
import MainHomePage from "./MainHomePage";

const HomePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let [emailVerify, setEmailVerify] = useState(false);

  // props data pass
  let [userDetails, setUserDetails] = useState('')

  useEffect (() => { 
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerify(user.emailVerified);
        const uid = user.uid;
        // console.log(user);
        setUserDetails(user)
        
      } else {
        console.log('user nai');
        navigate('/')
      }
    });
  },[]);

  return (
    <>
      
     {
      emailVerify ?
      <MainHomePage user={userDetails} class/>
      :
      <Alert severity="error">Please check your email for verify</Alert>
     }
    </>
  );
};

export default HomePage;
