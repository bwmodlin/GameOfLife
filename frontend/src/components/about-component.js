import "../css/About.css"
import { Button, ListGroup } from 'react-bootstrap'
function About(props) {
    return (
        <div className="screen">
            <Button href="/" className="btn-home" variant="success">Back to Homepage</Button>
            <div className="about-container">
                <h1 className="title">
                    About the App
                </h1>
                <h3>
                    Motivation
                </h3>
                <p>
                    This project was created to practice React, Node, Express, and PostgreSQL. <a className="github-link" href="https://github.com/bwmodlin/GameOfLife">Github</a>
                </p>
                <h3>
                    Game Rules
                </h3>
                <p>
                    The app simulates <a className="github-link" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"> Conway's Game of Life </a>
                </p>
                <ListGroup className="rules" as="ol" numbered>
                    <ListGroup.Item as="li">An active cell will stay active with 2 or 3 live neighbors</ListGroup.Item>
                    <ListGroup.Item as="li">Any inactive cell will become active with 3 live neighbors</ListGroup.Item>
                    <ListGroup.Item as="li">The app evaluates if each cell should be active every step</ListGroup.Item>
                </ListGroup>
                <p>
                </p>
                <h3>
                    Using the App
                </h3>

                <p>
                    Left clicking on each cell while the simulation is not running toggles its activity. <br></br>
                    The user can <strong> step </strong> to go forward one generation, or <strong> run </strong>  to go through generations quickly.
                </p>
            </div>
        </div>

    )
}
export default About