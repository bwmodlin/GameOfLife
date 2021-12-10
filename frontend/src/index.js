import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals';

const BOARD_WIDTH = 40
const BOARD_HEIGHT = 20

let grid = new Array(BOARD_HEIGHT)
for (let i = 0; i < BOARD_HEIGHT; i++) {
    grid[i] = new Array(BOARD_WIDTH)
    grid[i] = grid[i].fill(false)
}

ReactDOM.render(
  <React.StrictMode>
      <App grid={grid}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
