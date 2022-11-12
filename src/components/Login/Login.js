import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField
} from "@mui/material";
import { Container } from "@mui/system";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider, signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  // firebase
  const auth = getAuth();
  const [Open, setOpen] = useState(false);
  
 
  // firebase
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [password, setPassword] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [checkPassword, setCheckPassword] = useState(false);
  let [wrongEmailerr, setWrongEmailerr] = useState("");
  let [wrongPasserr, setWrongPasserr] = useState("");

  let handleSubmit = (e) => {
    if (!email) {
      setEmailerr("Please enter your Email");
    } else if (!password) {
      setPassworderr("Please enter your password");
      setEmailerr("");
    } else {
      setPassworderr("");
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          // console.log(user);
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("user")) {
            setOpen(true);
            setWrongEmailerr("This Email is not matched");
            setWrongPasserr("");
          } else if (errorCode.includes("auth")) {
            setOpen(true);
            setWrongPasserr("This Password is not matched");
            setWrongEmailerr("");
          }
          console.log(errorCode);
        });
    }
  };

  let handleeye = (e) => {
    setCheckPassword(!checkPassword);
  };

  let handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  let handleFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
 

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} rowSpacing={1} className="Signup">
          <Grid item md={6}>
            <h1>Login to your account!</h1>
            <Collapse in={Open}>
              <Alert
                variant="filled"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {wrongEmailerr ? wrongEmailerr : wrongPasserr && wrongPasserr}
              </Alert>
            </Collapse>
            <div className="d-flex align-center">
              <p>Sign in with - </p>
              <div className="google">
                <Button variant="outline-primary" onClick={handleGoogle}>
                  Google
                </Button>{" "}
              </div>
              {/* <div className="fb">
                <Button variant="outline-success" onClick={handleFacebook}>
                  Facebook
                </Button>{" "}
              </div> */}
            </div>
            <br />
            <br />
            <div className="eye">
              <TextField
                helperText={emailerr}
                id="demo-helper-text-aligned"
                label="Email Addres"
                className="mb-3"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <br />
            <div className="eye">
              <TextField
                helperText={passworderr}
                id="demo-helper-text-aligned"
                label="Password"
                className="mb-3"
                type={checkPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eyeIcon" onClick={handleeye}>
                {checkPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <div><Link to="/reset-password">Forgot Password</Link></div>
            <br />
            <Button
              variant="contained mb-5"
              onClick={handleSubmit}
              type="submit"
            >
              Login to Continue
            </Button>
              
            <p>
              Don’t have an account? <Link to="/Signup">Sign up</Link>
            </p>
          </Grid>
          <Grid item md={6}>
            <img
              className="img"
              src="./assets/images/signup/signup.png"
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
