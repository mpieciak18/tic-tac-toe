const gameBoard = (function() {
    const plays = [null, null, null, null, null, null, null, null, null];

    // sets user to play first
    let whoseTurn = 1;

    let gameDone = false;

    let numRounds = 0;

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

    const resetButton = document.getElementById('reset-button');

    const resetGame = function() {
        for (let i = 0; i < 9; i++) {
            plays[i] = null;
            squaresArr[i].innerHTML = '';
        };
        whoseTurn = 1;
        numRounds = 0;
        gameDone = false;
        statusMessage.innerText = `It is Player X\'s turn.`;
        addClicksToSquares();
    };

    const displayWin = function() {
        if (whoseTurn == 1) {
            statusMessage.innerText = 'Player X wins!!!'
        } else {
            statusMessage.innerText = 'Player O wins!!!'
        };
    };

    const displayTie = function() {
        statusMessage.innerText = 'The game is a tie!'
    };

    const displayTurn = function() {
        if (whoseTurn == 1) {
            statusMessage.innerText = `It is Player X\'s turn.`
        } else {
            statusMessage.innerText = `It is Player O\'s turn.`
        };
    };

    const updatePlaysArr = function(event, play, rawIndex) {
        // updates the play array
        const index = Number(rawIndex);
        plays[index] = play;
    };

    const updatePlaysDom = function(event, play) {
        // updates the gameboard squares
        square = event.target;
        square.innerHTML = play;
        square.removeEventListener('click', playMove);
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

    const addClicksToSquares = function() {
        for (let i = 0; i < squaresArr.length; i++) {
            let square = squaresArr[i];
            square.addEventListener('click', playMove);
        };
    };

    const playMove = function(event) {
        if (gameDone == true) {
            return null;
        };

        const play = returnPlay();       
        const rawIndex = event.target.id.slice(7);       
        updatePlaysArr(play, rawIndex);
        updatePlaysDom(event, play);

        numRounds += 1;

        if (checkForWin() == true) {
            displayWin();
            gameDone = true;
        } else if (numRounds == 9) {
            displayTie();
        } else {
            changeWhoseTurn();
            displayTurn();
        };
    };

    addClicksToSquares();
    resetButton.addEventListener('click', resetGame);

    return {squaresArr, plays, numRounds};
})();