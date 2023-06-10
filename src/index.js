import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Circle from './Circle';
import { BarChart } from "./BarChart";
import Network from './Network';
import Process from './Process';
import Data from './Data';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Data />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
