import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import pkg from 'semantic-ui-react/package.json'
import "semantic-ui-css/semantic.min.css"
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <>
    <App/>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
