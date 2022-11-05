import { TextField } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

const ResetPassword = () => {
    // firebase
  const auth = getAuth();
  const [email, setEmail] = useState(null)


     const ResetPassword = () => {
    console.log('pass click');
    sendPasswordResetEmail(auth, email)
  .then((user) => {
   
    
    console.log('pass send');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    
  }
    return (
        <div>
            <p>Reset Password</p>
            <div>
            <TextField
                id="demo-helper-text-aligned"
                label="Email Addres"
                className="mb-3"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" onClick={ResetPassword}>Submit</button>
        </div>
    );
};

export default ResetPassword;