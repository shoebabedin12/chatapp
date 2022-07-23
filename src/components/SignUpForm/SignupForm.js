import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Collapse, Grid, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  // firebase
  const auth = getAuth();
  const db = getDatabase();
  const [open, setOpen] = useState(false);
  // firebase`
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [name, setName] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [password, setPassword] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [confirmpassword, setConfirmPassword] = useState("");
  let [confirmpassworderr, setConfirmPassworderr] = useState("");
  let [passwordlengtherr, setPasswordlengtherr] = useState("");
  let [passwordmatcherr, setPasswordmatcherr] = useState("");
  let [emailExisterr, setEmailExisterr] = useState("");

  let handleSubmit = (e) => {
    
    if (!email) {
      setEmailerr("Please enter your Email");
    } else if (!name) {
      setNameerr("Please enter your Name");
      setEmailerr("");
    } else if (!password) {
      setPassworderr("Please enter your password");
      setNameerr("");
    } else if (!confirmpassword) {
      setConfirmPassworderr("Please enter your password");
      setPassworderr("");
    } else if (password.length < 8) {
      setPasswordlengtherr("Please enter at last 8 Caracter");
      setConfirmPassworderr("");
    } else if (password !== confirmpassword) {
      setPasswordmatcherr("password not matched");
      setPasswordlengtherr("");
    } else {
      setPasswordmatcherr("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("email send for verification");
            set(ref(db, 'users/' + auth.currentUser.uid), {
              username: name,
              email: email,
            });
            navigate("/");
            
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            setOpen(true)
            setEmailExisterr(
              "This Email is already Exist...Please Try another Email!"
            );
          }
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} rowSpacing={1} className="Signup">
          <Grid item md={6}>
            <h1>Get started with easily register</h1>
            <p>Free register and you can enjoy it</p>
            <Collapse in={open}>
              <Alert  variant="filled" severity="error"
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
                {emailExisterr}
              </Alert>
            </Collapse>
            <TextField
              helperText={emailerr}
              id="demo-helper-text-aligned"
              label="Email"
              className="mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              helperText={nameerr}
              id="demo-helper-text-aligned"
              label="Name"
              className="mb-3"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
              helperText={passworderr ? passworderr : passwordlengtherr}
              id="demo-helper-text-aligned"
              label="Password"
              className="mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <TextField
              helperText={
                confirmpassworderr ? confirmpassworderr : passwordmatcherr
              }
              id="demo-helper-text-aligned"
              label="Confirm Password"
              className="mb-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
              signup
            </Button>
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

export default SignupForm;
