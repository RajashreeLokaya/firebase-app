import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import './SignUp.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const signupEmail = useRef(null);
  const signupPassword = useRef(null);

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const enteredEmail = signupEmail.current.value;
    const enteredPassword = signupPassword.current.value;
    try {
        await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
        setMessage('User created successfully!');
        setError(null);
        navigate('/landingPage'); // Redirect to another page after successful sign-up
      } catch (error) {
        console.error("Error while creating new user:", error);
        setError(error.message);
        setMessage(null);
        return error.message
      }
  };

  return (
    <Container maxWidth="xs" className="signup-container">
      <Box className="signup-box">
        <Typography variant="h4" component="h2" gutterBottom>
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSignUp} className="signup-form">
          <TextField
            margin="normal"
            fullWidth
            type="email"
            label="Email"
            inputRef={signupEmail}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="New Password"
            inputRef={signupPassword}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
          >
            Sign Up
          </Button>
        </Box>
        {/* Display Messages */}
        {error && <Alert severity="error" className="alert">{error}</Alert>}
        {message && <Alert severity="success" className="alert">{message}</Alert>}
        <Typography variant="body2" className="signin-text">
          Already have an account? <a href="/">Sign In</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
