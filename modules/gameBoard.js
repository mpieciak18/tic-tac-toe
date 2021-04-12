import { gameLogic } from './gameLogic.js'
import { livePlayer } from './livePlayer.js'

const gameBoard = (function() {
    const squares = document.getElementsByClassName('grid-square');
    const squaresArr = Array.from(squares);
    const getSquaresArr = () => squaresArr;
    const setSquaresArr = function(index, value) {
        squaresArr[index].innerHTML = value;
    };

    const statusMessage = document.getElementById('status');
    const getStatusMessage = () => statusMessage;
    const setStatusMessage = function(value) {
        statusMessage.innerText = value;
    };

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', gameLogic.resetGame);

    const displayWin = function() {
        if (gameLogic.getWhoseTurn() == 1) {
            statusMessage.innerText = 'Player X wins!!!'
        } else {
            statusMessage.innerText = 'Player O wins!!!'
        };
    };

    const displayTie = function() {
        statusMessage.innerText = 'The game is a tie!'
    };

    const displayTurn = function() {
        if (gameLogic.getWhoseTurn() == 1) {
            statusMessage.innerText = `It is Player X\'s turn.`
        } else {
            statusMessage.innerText = `It is Player O\'s turn.`
        };
    };

    const updatePlaysDom = function(selectedSquare, play) {
        // updates the gameboard squares
        let square = selectedSquare;
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

    return {getSquaresArr, setSquaresArr, getStatusMessage, setStatusMessage,
            displayWin, displayTie, displayTurn, updatePlaysDom,
            addClicksToSquares};
})();

export { gameBoard };