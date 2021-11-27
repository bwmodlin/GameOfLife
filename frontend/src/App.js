import './App.css';
import React, { useState , useEffect } from 'react'

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

// only checks cells that are at least next to another active cell to optimize a little bit
function newGrid(grid) {
    let toVisit = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        toVisit[i] = new Array(grid[0].length)
        toVisit[i].fill(false)
    }

    let grid_copy = deepCopy(grid)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j]) {
                toVisit[i][j] = true
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if (i+k >= 0 && j+l >= 0 && i+k < grid.length && j+l < grid[0].length) {
                            toVisit[i+k][j+l] = true
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < toVisit.length; i++) {
        for (let j = 0; j < toVisit[0].length; j++) {
            if (toVisit[i][j]) {
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

function App(props) {
    let [grid, setGrid] = useState(props.grid)
    let [isRun, setRun] = useState(false)
    let [startText, setText] = useState("Run")

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
            setTimeout(() => setGrid(newGrid(grid)), 10)
        }
    }, [isRun, grid]);

    return (
        <div className = "screen">
            <nav className="navbar">
                <div className="left">

                    {isRun ? null : <button className="navbtn" onClick={handleStep}>Step</button>}

                    <button className={startText==="Run" ? "navbtn" : " navbtn btn-red"} onClick={run}>
                        {startText}
                    </button>

                    {isRun ? null : <button className="navbtn" onClick={() => setGrid(clear(grid))}>Clear</button>}
                </div>
                <div className="center">
                    <div className="nav-title">
                        Conway's Game of Life
                    </div>
                </div>
                <div className="right">

                    <button className="navbtn" >
                        Saved
                    </button>
                    <button className="navbtn">
                        Login
                    </button>
                    <button className="navbtn" >
                        About
                    </button>
                </div>

            </nav>
            <div className="grid-container">
                {grid.map((row) => (<Row state={grid.indexOf(row)} row={row} grid={grid}/>))}
            </div>


        </div>
    )
}

export default App;
