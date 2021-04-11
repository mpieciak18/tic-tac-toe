const livePlayer = (function() {
    const playMove = function(event) {
        if (logic.gameDone == true) {
            return null;
        };

        const play = logic.returnPlay();       
        const rawIndex = event.target.id.slice(7);       
        logic.updatePlaysArr(play, rawIndex);
        board.updatePlaysDom(event, play);

        logic.numRounds += 1;

        if (logic.checkForWin() == true) {
            board.displayWin();
            logic.gameDone = true;
        } else if (logic.numRounds == 9) {
            board.displayTie();
        } else {
            logic.changeWhoseTurn();
            board.displayTurn();
        };
    };

    return {playMove};
})();

// const computerPlayer = (function() {

// })();

const logic = (function() {
    const plays = [null, null, null, null, null, null, null, null, null];

    // sets user to play first
    let whoseTurn = 1;

    let gameDone = false;

    let numRounds = 0;

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

    const resetGame = function() {
        for (let i = 0; i < 9; i++) {
            plays[i] = null;
            board.squaresArr[i].innerHTML = '';
        };
        whoseTurn = 1;
        numRounds = 0;
        gameDone = false;
        board.statusMessage.innerText = `It is Player X\'s turn.`;
        board.addClicksToSquares();
    };

    const updatePlaysArr = function(play, rawIndex) {
        // updates the play array
        const index = Number(rawIndex);
        plays[index] = play;
    };

    const returnPlay = function() {
        if (whoseTurn == 1) {
            return 'X';
        } else {
            return 'O';
        };
    };

    const changeWhoseTurn = function() {
        // if whoseTurn == 1 then user plays
        // else computer plays
        whoseTurn *= -1;
    };

    return {whoseTurn, gameDone, numRounds, checkForWin, resetGame, updatePlaysArr, returnPlay, changeWhoseTurn};
})();

const board = (function() {
    const squares = document.getElementsByClassName('grid-square');

    const squaresArr = Array.from(squares);

    const statusMessage = document.getElementById('status');

    const resetButton = document.getElementById('reset-button');

    const displayWin = function() {
        if (logic.whoseTurn == 1) {
            statusMessage.innerText = 'Player X wins!!!'
        } else {
            statusMessage.innerText = 'Player O wins!!!'
        };
    };

    const displayTie = function() {
        statusMessage.innerText = 'The game is a tie!'
    };

    const displayTurn = function() {
        if (logic.whoseTurn == 1) {
            statusMessage.innerText = `It is Player X\'s turn.`
        } else {
            statusMessage.innerText = `It is Player O\'s turn.`
        };
    };

    const updatePlaysDom = function(event, play) {
        // updates the gameboard squares
        square = event.target;
        square.innerHTML = play;
        square.removeEventListener('click', livePlayer.playMove);
    };

    const addClicksToSquares = function() {
        for (let i = 0; i < squaresArr.length; i++) {
            let square = squaresArr[i];
            square.addEventListener('click', livePlayer.playMove);
        };
    };

    addClicksToSquares();
    resetButton.addEventListener('click', logic.resetGame);

    return {squaresArr, statusMessage, displayTie, displayTurn, displayWin, updatePlaysDom, addClicksToSquares};
})();