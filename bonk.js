


window.onload = function() {
    setGame();
}

function setGame() {
    // set up grid for the game board in html
    for (var i = 0; i < 9; i++) { //i goes from 0 to 8, stop at 9
        // <div id= "0-8"></div>
        let tile  = document.createElement('div');
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    }
}