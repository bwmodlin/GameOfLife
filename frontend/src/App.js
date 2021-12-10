import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import About from "./components/about-component";
import Game from "./components/game"

import React, { useState , useEffect } from 'react'

function App(props) {
    const BOARD_WIDTH = 40
    const BOARD_HEIGHT = 20

    let grid = new Array(BOARD_HEIGHT)
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        grid[i] = new Array(BOARD_WIDTH)
        grid[i] = grid[i].fill(false)
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Game grid={grid}/>}/>
                <Route exact path="/about" element={<About />}/>
            </Routes>
        </Router>

    )
}


export default App

