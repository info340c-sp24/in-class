import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';

//Import needed auth functions: getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut 
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

function App() {
  // Set initial state using useState (user, email, password, username, errorMessage)
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Initialize Firebase app with the provided configuration
  const auth = getAuth();


  useEffect(() => {
    // Listen to state authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        // If there is a user, set the state of `user`, and set state of email, password and errormessage to blank
        if (user) {
          setUser(user);
          setEmail('');
          setPassword('');
          setErrorMessage('');
        //otherwise user is null
        } else {
          setUser(null);
        }
    });
    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Method for handling changes to forms
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Use separate state setters for each field
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'username') {
      setUsername(value);
    }
  };

  // Method for handling someone signing up 
  const handleSignUp = async () => {
      try {
          // Create a new user and save their information
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // THEN update the display name of the user. Be sure to reset the form field to blank
          await updateProfile(userCredential.user, { displayName: username });
          setUsername('');
          // Set the state as the current (firebase) user
          setUser(userCredential.user);
          console.log(user)
        } catch (error) {
          setErrorMessage(error.message);
      }
  };

  // Method for handling someone signing in
  const handleSignIn = async () => {
      try {
        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        console.log(user);

      } catch (error) {
          setErrorMessage(error.message);
      }
  };

  // Method for handling someone signing out
  const handleSignOut = async () => {
      try {
          // Sign out the user. Reset the form to blank
        await signOut(auth);
        setEmail('');
        setPassword('');
        setUsername('');

        } catch (error) {
          setErrorMessage(error.message);
      }
  };
  // set welcomeDiv to a sign up/sign in message if no user, otherwise display a message for the user
  const welcomeDiv = user === null ? <h1>Sign in or Sign-up below!</h1> : <Alert color="info">Hello, {user.displayName}</Alert>;

  // set up an ErrorDiv for any errors coming back from the the auth calls
  const errorDiv = errorMessage === "" ? "" : <Alert color='danger'>Error: {errorMessage}</Alert>;
 
  // evaluate if the email is valid
  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //check if we are ready to submit the form / isNotReadytoSubmit will be true if any of the following conditions is met:
    //The user is already logged in (user is truthy). 
    //The email is not valid. 
    //The password is an empty string.
  const isNotReadytoSubmit = !!user || (!isValidEmail(email) || password === '');

  // Create (and render) divs to welcome the user / show errors 
  return (
    <Container>
      {welcomeDiv}
      <FormGroup floating>
      <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          valid={isValidEmail(email)}
          invalid={!isValidEmail(email)}
          value={email}
          onChange={(event) => handleChange(event)}
        />
        <Label for="email">Email</Label>
      </FormGroup>

      <FormGroup floating>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => handleChange(event)}
        />
        <Label>Password</Label>
      </FormGroup>

      <FormGroup floating>
        
        <Input
          id="username"
          //no type for username
          name="username"
          placeholder="Username"
          value={username}
          onChange={(event) => handleChange(event)}
        />
        <Label>Username</Label>
      </FormGroup>

      <FormGroup>
        <Button color="primary" className="mr-2" onClick={handleSignUp} disabled={isNotReadytoSubmit || username === ''}>
          Sign Up
        </Button>
        {' '}
        <Button color="success" className="mr-2" onClick={handleSignIn} disabled={isNotReadytoSubmit || username !== ''}>
          Sign In
        </Button> 
        {' '}
        <Button color="danger" className="mr-2" onClick={handleSignOut} disabled={user === null}>
          Sign Out
        </Button>
      </FormGroup>
      {errorDiv}
    </Container>
  );
}

export default App;