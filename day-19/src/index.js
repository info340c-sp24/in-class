import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDAe8FmL3TmNVKn60KemPFyFdywvsGsfi0",
  authDomain: "fir-be9d5.firebaseapp.com",
  databaseURL: "https://fir-be9d5-default-rtdb.firebaseio.com",
  projectId: "fir-be9d5",
  storageBucket: "fir-be9d5.appspot.com",
  messagingSenderId: "442687996235",
  appId: "1:442687996235:web:55b1249fc71c703cb9a8ce"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

