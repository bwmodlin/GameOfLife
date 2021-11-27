import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const BOARD_WIDTH = 40
const BOARD_HEIGHT = 20

let grid = new Array(BOARD_HEIGHT)
for (let i = 0; i < BOARD_HEIGHT; i++) {
    grid[i] = new Array(BOARD_WIDTH)
    grid[i] = grid[i].fill(false)
}
grid[5][1] = true; grid[5][2] = true; grid[6][1] = true; grid[6][2] = true; grid[5][11] = true; grid[6][11] = true;
grid[7][11] = true; grid[4][12] = true; grid[8][12] = true; grid[3][13] = true; grid[9][13] = true; grid[3][14] = true
grid[9][14] = true; grid[6][15] = true; grid[4][16] = true; grid[8][16] = true; grid[5][17] = true; grid[6][17] = true;
grid[7][17] = true; grid[6][18] = true; grid[5][21] = true; grid[4][21] = true; grid[3][21] = true; grid[5][22] = true;
grid[4][22] = true; grid[3][22] = true; grid[2][23] = true; grid[6][23] = true; grid[1][25] = true; grid[2][25] = true;
grid[6][25] = true; grid[7][25] = true; grid[3][35] = true; grid[3][36] = true; grid[4][35] = true; grid[4][36] = true;

ReactDOM.render(
  <BrowserRouter>
    <App grid={grid} />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
