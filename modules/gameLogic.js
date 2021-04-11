import { gameBoard } from './gameBoard.js'

const gameLogic = (function() {
    const plays = [null, null, null, null, null, null, null, null, null];

    // sets user to play first
    let whoseTurn = 1;
    const getWhoseTurn = () => whoseTurn;
    const setWhoseTurn = function(value) {
        whoseTurn = value;
    };

    let gameDone = false;
    const getGameDone = () => gameDone;
    const setGameDone = function(value) {
        gameDone = value;
    };

    let numRounds = 0;
    const getNumRounds = () => numRounds;
    const setNumRounds = function(value) {
        numRounds = value;
    };

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
            gameBoard.setSquaresArr(i, '');
        };
        whoseTurn = 1;
        numRounds = 0;
        gameDone = false;
        gameBoard.setStatusMessage(`It is Player X\'s turn.`);
        gameBoard.addClicksToSquares();
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

    return {getWhoseTurn, setWhoseTurn, getGameDone, setGameDone,
            getNumRounds, setNumRounds, checkForWin, resetGame,
            updatePlaysArr, returnPlay, changeWhoseTurn};
})();

export { gameLogic };