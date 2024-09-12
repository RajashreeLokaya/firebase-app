import { useRef, useState } from "react";
import {
  useAuth,
} from "../../contex/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.css";

const Login = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/landingPage");
    } catch (err) {
      setError("Failed to log in with Google. Please try again.");
    }
  };

  if (currentUser) {
    navigate("/landingPage");
    return null;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      setMessage("Signed in successfully!");
      setError(null);
    } catch (error) {
      console.error("Error while signing in:", error.message);
      setError(error.message);
      setMessage(null);
      return error.message;
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Box className="login-box">
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome To Firebase
        </Typography>

        {/* Sign In Form */}
        <Box component="form" onSubmit={handleSignIn} className="login-form">
          <TextField
            margin="normal"
            fullWidth
            type="email"
            label="Email"
            inputRef={emailRef}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            inputRef={passwordRef}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
          >
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" className="signup-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          className="google-login-btn"
        >
          Continue with Google
        </Button>

        {/* Display Messages */}
        {error && (
          <Alert severity="error" className="alert">
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" className="alert">
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Login;
