const gameBoard = (function() {
    const plays = [null, null, null, null, null, null, null, null, null];

    // sets user to play first
    let whoseTurn = 1;

    let gameDone = false;

    const squares = document.getElementsByClassName('grid-square');

    const squaresArr = Array.from(squares);

    const checkForWin = function() {
        if (plays[0] != null && plays[0] == plays [1] && plays [0] == plays[2] ||
            plays[3] != null && plays[3] == plays [4] && plays [3] == plays[5] ||
            plays[6] != null && plays[6] == plays [7] && plays [6] == plays[9] ||
            plays[0] != null && plays[0] == plays [3] && plays [0] == plays[6] ||
            plays[1] != null && plays[1] == plays [4] && plays [1] == plays[7] ||
            plays[2] != null && plays[2] == plays [5] && plays [2] == plays[8] ||
            plays[0] != null && plays[0] == plays [4] && plays [0] == plays[8] ||
            plays[2] != null && plays[2] == plays [4] && plays [2] == plays[6]) {
            return true;
        } else {
            return false;
        };
    };

    const statusMessage = document.getElementById('status');

    const displayWin = function() {
        if (whoseTurn == 1) {
            statusMessage.innerText = 'Player X wins!!!'
        } else {
            statusMessage.innerText = 'Player O wins!!!'
        };
    };

    const displayTurn = function() {
        if (whoseTurn == 1) {
            statusMessage.innerText = `It is Player X\'s turn.`
        } else {
            statusMessage.innerText = `It is Player O\'s turn.`
        };
    };

    const updatePlays = function(play, rawIndex) {
        const index = Number(rawIndex);
        plays[index] = play;
    };

    const changeWhoseTurn = function() {
        // if whoseTurn == 1 then user plays
        // else computer plays
        whoseTurn *= -1;
    };

    const playMove = function(event) {
        if (gameDone == true) {
            return null;
        };

        let play = '';
        if (whoseTurn == 1) {
            event.target.innerHTML = 'X';
            play = 'X';
        } else {
            event.target.innerHTML = 'O';
            play = 'O';
        };
        
        const rawIndex = event.target.id.slice(7);
        updatePlays(play, rawIndex);

        if (checkForWin() == true) {
            displayWin();
            gameDone = true;
        } else {
            changeWhoseTurn();
            displayTurn();
        };
    };

    for (let i = 0; i < squaresArr.length; i++) {
        let square = squaresArr[i];
        square.addEventListener('click', playMove);
    }

    return {squaresArr, plays};
})();