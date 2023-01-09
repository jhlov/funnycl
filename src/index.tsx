import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "store";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsWfy26x-E3wWgdNHN938RwmtofPFX3cE",
  authDomain: "funnycl.firebaseapp.com",
  projectId: "funnycl",
  storageBucket: "funnycl.appspot.com",
  messagingSenderId: "606207082154",
  appId: "1:606207082154:web:1c99bbce79da169dd21ad3",
  databaseURL: "https://funnycl-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
