import { gameBoard } from './gameBoard.js'

const gameLogic = (function() {
    const plays = [[null, null, null], 
                   [null, null, null], 
                   [null, null, null]];
    const getPlays = () => plays;

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
        for (let row = 0; row < 3; row++) {
            if (plays[row][0] != null && plays[row][0] == plays[row][1] && plays[row][0] == plays[row][2]) {
                return true;
            };
        };
        for (let col = 0; col < 3; col++) {
            if (plays[0][col] != null && plays[0][col] == plays[1][col] && plays[0][col] == plays[2][col]) {
                return true;
            };
        };
        if (plays[0][0] != null && plays[0][0] == plays[1][1] && plays[0][0] == plays[2][2]) {
            return true;
        } else if (plays[0][2] != null && plays[0][2] == plays[1][1] && plays[0][2] == plays[2][0]) {
            return true;
        } else {
            return false;
        };
    };

    const resetGame = function() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                plays[row][col] = null;
                gameBoard.setSquaresMatr(row, col, '');
            };
        };
        whoseTurn = 1;
        numRounds = 0;
        gameDone = false;
        gameBoard.setStatusMessage(`It is Player X\'s turn.`);
        gameBoard.addClicksToSquares();
    };

    const updatePlaysMatr = function(play, row, col) {
        // updates the play matrix
        plays[row][col] = play;
    };

    const changeWhoseTurn = function() {
        // if whoseTurn == 1 then user plays
        // else computer plays
        whoseTurn *= -1;
    };

    return {getWhoseTurn, setWhoseTurn, getGameDone, setGameDone,
            getNumRounds, setNumRounds, checkForWin, resetGame,
            updatePlaysMatr, changeWhoseTurn, getPlays};
})();

export { gameLogic };