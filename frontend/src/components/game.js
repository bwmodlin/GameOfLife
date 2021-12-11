import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useState , useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import {Link} from "react-router-dom";
import {GoogleLogin} from "react-google-login"
import axios from "axios"
import {reshape} from 'mathjs'
import {DropdownButton, Dropdown, Navbar, Nav, Button, Container, NavDropdown} from 'react-bootstrap'


require("dotenv").config();


function deepCopy(grid) {
    let copy = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        copy[i] = new Array(grid[0].length)
        for (let j = 0; j < grid[0].length; j++) {
            copy[i][j] = grid[i][j]
        }
    }
    return copy
}

function getNeighbors(grid, w, h) {
    let neighbors = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

            if (w+i >= 0 && h+j >= 0 && w+i < grid.length && h+j < grid[0].length && (i !== 0 || j !== 0) && grid[w+i][h+j]) {
                neighbors += 1
            }
        }
    }

    return neighbors
}

function visit(grid, grid_copy, i, j) {
    let neighbors = getNeighbors(grid, i, j)
    if (grid[i][j]) {
        if (!(neighbors === 2 || neighbors === 3)) {
            grid_copy[i][j] = false
        }
    } else {
        if (neighbors === 3) {
            grid_copy[i][j] = true
        }
    }
}

// only checks cells that are at least next to another active cell to optimize a little bit
function newGrid(grid) {
    let alreadyVisited = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        alreadyVisited[i] = new Array(grid[0].length)
        alreadyVisited[i].fill(false)
    }

    let grid_copy = deepCopy(grid)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j]) {
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if (i+k >= 0 && j+l >= 0 && i+k < grid.length && j+l < grid[0].length) {
                            if (!alreadyVisited[i+k][j+l]) {
                                visit(grid, grid_copy, i+k, j+l)
                                alreadyVisited[i+k][j+l] = true
                            }

                        }
                    }
                }
            }
        }
    }

    return grid_copy
}

function clear(grid) {
    let clear_grid = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        clear_grid[i] = new Array(grid[i].length)
        clear_grid[i].fill(false)
    }
    return clear_grid
}

function Game(props) {
    let [grid, setGrid] = useState(props.grid)
    let [isRun, setRun] = useState(false)
    let [startText, setText] = useState("Run")
    const BOARD_WIDTH = 40
    const BOARD_HEIGHT = 20
    let [saved, setSaved] = useState([])

    useEffect(() => {
        axios.get('https://modlingameoflife.herokuapp.com/api/presets')
            .then( (res) => {
                setSaved(res.data)
            }

            )
    }, []);

    const handleSaved = (index) => {
        return (
            () => {
                const arr = saved[index].board
                const newArr = reshape(arr, [BOARD_HEIGHT, BOARD_WIDTH])
                setGrid(newArr)
            }
        )
    }

    function Element(props) {
        let value = props.value
        let state = props.state
        let color = !value ? "off" : "on"
        let classes = `element ${color}`
        const handleClick = () => {
            let new_grid = deepCopy(grid)
            new_grid[state[0]][state[1]] = !value
            setGrid(new_grid)
        }
        return (
            <div className={classes} onClick={handleClick}>

            </div>
        )
    }

    function Row(props) {
        let row = props.row
        let grid = props.grid
            return (
                <div className = "row-container">
                    {row.map((value, index) => (<Element state={[grid.indexOf(row), index]} value={value}/>))}
                </div>
            )

    }

    function DropdownItem(props) {
        return (
            <NavDropdown.Item onClick={handleSaved(saved.indexOf(props.item))}><span className="navbar-text">{props.item.name}</span></NavDropdown.Item>
        )
    }


    const run = () => {
        if (isRun) {
            setText("Run")
        } else {
            setText("Stop")
        }
        setRun(!isRun)

    }

    const handleStep = () => {
        setGrid(newGrid(grid))
    }

    useEffect(() => {
        if (isRun) {
            let new_grid = newGrid(grid)
            setTimeout(() => setGrid(new_grid), 30)
            if (!new_grid.some(row => row.includes(true))) { // if grid is empty, stop run automatically
                setRun(false)
                setText("Run")
            }
        }
    }, [isRun, grid]);

    if(isMobile) {
        return (
            <div> No mobile support yet </div>
        )
    }

    const handleLogin = () => {

    }


    return (
        <div className = "screen">
            <Navbar expand="lg" className="navbar-color" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <span className="nav-title">Conway's Game of Life</span>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="/about"><span className="navbar-text">About</span></Nav.Link>
                            <NavDropdown title={<span className="navbar-text">Saved</span>} id="basic-nav-dropdown">
                                {saved.map((save) => (<DropdownItem item={save}/>))}
                            </NavDropdown>
                        </Nav>

                        <Nav.Link onClick={run}>
                            <span className={startText==="Run" ? "navbar-text" : "navbar-text text-red"}>
                                {startText}
                            </span>

                        </Nav.Link>

                        {isRun ? null : <Nav.Link onClick={handleStep}><span className="navbar-text">Step</span></Nav.Link>}

                        {isRun ? null : <Nav.Link onClick={() => setGrid(clear(grid))}><span className="navbar-text">Clear</span></Nav.Link>}
                    </Navbar.Collapse>
                </Container>

            </Navbar>

            <div className="grid-container">
                {grid.map((row) => (<Row state={grid.indexOf(row)} row={row} grid={grid}/>))}
            </div>


        </div>
    )
}

export default Game;
