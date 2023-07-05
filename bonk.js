//shows me where the sus is
let CurrSusTile
let CurrMaxwellTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // set up grid for the game board in html
    for (var i = 0; i < 9; i++) { //i goes from 0 to 8, stop at 9
        // <div id= "0-8"></div>
        let tile  = document.createElement('div');
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setSus, 1000);//2000 milliseconds = 2 seconds
    setInterval(setMaxwell, 2000);
}


//gets a random tile from the game board
function getRandomTile() {
    // math.random() returns a number between 0 and 1
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}


//sets the sus
function setSus() {
    if (gameOver) {
            return;
        }

    if (CurrSusTile) {
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

function setMaxwell() {
   
    if (gameOver) {
        return;
    }

    if (CurrMaxwellTile) {
            CurrMaxwellTile.innerHTML = "";
        }

     let maxwell = document.createElement("img");
     maxwell.src = "./resources/maxwell.png";

     let num = getRandomTile();
     CurrMaxwellTile = document.getElementById(num);
     CurrMaxwellTile.appendChild(maxwell);
}

function selectTile() {

    if (gameOver) {
        return;
    }

    if(this == CurrSusTile) {
        score += 100;
        document.getElementById("score").innerText = score.toString();//updates score
    }

    else if (this == CurrMaxwellTile) {
       // score -= 1000000;
        document.getElementById("score").innerText =  "NOOOOO MAXWELLL score:" + score.toString();//ends the game
        gameOver = true;
    }
}