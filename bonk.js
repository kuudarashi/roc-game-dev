//shows me where the sus is
let CurrSusTile
let CurrMaxwellTile;
let score = 0;
let gameOver = false;
let isPaused = false;

const Timer = function() {
    this.gameTime = 0;
    this.pauseScreen = null
    this.pauseButton = null;
    this.resumeButton = null;

    // tick function is called every second
    this.tick = function() {
        if (isPaused) return; //if the game is paused, don't do anything
        if (gameOver) return; //if the game is over, don't do anything

        setSus(); //set the sus

        if (this.gameTime % 2 == 0) { //every 2 seconds, set maxwell
            setMaxwell();
        }
        this.gameTime += 1; //increment the game time
        console.log(this.gameTime); //print the game time
    }
    /**
     * Starts the timer
     */
    this.start = function() {
        window.setInterval(this.tick.bind(this), 1000);
    }
    /**
     * Pauses the timer
     */
    this.pause = function() {
        isPaused = true;
        this.pauseScreen.classList.remove("hidden");
    }
    /**
     * Resumes the timer
     */
    this.resume = function() {
        isPaused = false;
        this.pauseScreen.classList.add("hidden");
    }
    /**
     * Sets up the timer
     */
    this.setup = function() {
        // get the pause screen, pause button, and resume button
        this.pauseScreen = document.getElementById("pause-screen");
        this.pauseButton = document.getElementById("pause");
        this.resumeButton = document.getElementById("resume");

        // add event listeners to the pause and resume buttons
        this.resumeButton.addEventListener("click", this.resume.bind(this));
    }
    this.clear = function() {   
        this.gameTime = 0;
    }

}

/**
 * @ Sets up the game
 * @ Creates the game board
 * @ Adds event listener to the restart button
 */
function setGame() {
    // set up grid for the game board in html
    for (var i = 0; i < 9; i++) { //i goes from 0 to 8, stop at 9
        // <div id= "0-8"></div>
        let tile  = document.createElement('div');
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // add event listener to the restart button
    document.getElementById("restart").addEventListener("click", Restart);
}

const timer = new Timer(); //create a new timer
const pauseGame = () => timer.pause(); //pause the game
const resumeGame = () => timer.resume(); //resume the game
const runGame = () => timer.start(); //run the game

window.onload = function() {
    document.getElementById("start").addEventListener("click", startGame); //add event listener to the start button
}

/**
 * @ Starts the game
 * @ Toggles the hidden class for the game board, score board, and start button
 * @ Sets up the game
 * @ Sets up the timer
 * @ Starts the timer
 * @ Adds event listener to the escape key
 */
function startGame() {
    // get the game board, score board, and start button
    const gameBoard = document.getElementById("board");
    const scoreBoard = document.getElementById("score");
    const startButton = document.getElementById("start");

    // toggle the hidden class for the game board, score board, and start button
    gameBoard.classList.remove("hidden");
    scoreBoard.classList.remove("hidden");
    startButton.classList.add("hidden");

    setGame(); //set up the game

    // add event listener to the escape key
    document.addEventListener("keydown", function(e){
        if (e.key=== "Escape") {
            if (isPaused) resumeGame();
            else pauseGame();
        }
    });

    timer.setup(); //set up the timer
    timer.start(); //start the timer
}

/**
 * @ Ends the game
 */
function GameOver() {
    gameOver = true;
    const gameOverScreen = document.querySelector(".game-over");
    gameOverScreen.classList.remove("hidden");
}

/**
 * @ Restarts the game
 * @ Resets the score and hides the game over screen
 * @ Clears the timer
 * @ Sets up the game
 * @ Runs the game
 */
function Restart() {
    gameOver = false;
    score = 0;
    document.getElementById("score").innerText = score.toString();
    const gameOverScreen = document.querySelector(".game-over");
    gameOverScreen.classList.add("hidden");
    timer.clear()
}

//gets a random tile from the game board
function getRandomTile() {
    // math.random() returns a number between 0 and 1
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}


/**
 * sets the sus
 */
function setSus() {
    if (CurrSusTile) { //if there is a sus tile, remove it
        CurrSusTile.innerHTML = "";
    }

    let sus = document.createElement("img");
    sus.src = "./resources/sus.png";

    let num = getRandomTile();
    if (CurrMaxwellTile && CurrMaxwellTile.id == num) {
        return;
    }
    CurrSusTile = document.getElementById(num);
    CurrSusTile.appendChild(sus);

}
/**
 * sets the maxwell
 */
function setMaxwell() {
    if (CurrMaxwellTile) { //if there is a maxwell tile, remove it
            CurrMaxwellTile.innerHTML = "";
    }

    let maxwell = document.createElement("img");
    maxwell.src = "./resources/maxwell.png";

    // if the maxwell tile is the same as the sus tile, don't set the maxwell tile there
    for (var i = 0; i < 999999; i++) {
        let num = getRandomTile();
        CurrMaxwellTile = document.getElementById(num);

        // check if the maxwell tile already has a sus
        if (CurrMaxwellTile && CurrMaxwellTile.innerHTML == "") {
            CurrMaxwellTile.appendChild(maxwell);
            break;
        }
    }
}

/**
 * checks if the tile is the sus or maxwell
 * @ Updates the score
 * @ Ends the game if the tile is maxwell
*/
function selectTile() {

    if (gameOver) {
        return;
    }
    //when the sus is clicked adds 100 to the current score
    if(this == CurrSusTile) {
        score += 100;
        document.getElementById("score").innerText = score.toString();//updates score
        setSus();
    }
    //when maxwell is clicked shows the current score and tell you that you lost
    else if (this == CurrMaxwellTile) {
        document.getElementById("score").innerText =  "NOOOOO MAXWELLL score:" + score.toString();//ends the game
        GameOver();
    }
}