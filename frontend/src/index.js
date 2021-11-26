import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const BOARD_SIZE = 20

let grid = new Array(BOARD_SIZE)
for (let i = 0; i < BOARD_SIZE; i++) {
    grid[i] = new Array(BOARD_SIZE)
    grid[i] = grid[i].fill(false)
}


ReactDOM.render(
  <React.StrictMode className="root">
    <App grid={grid} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
