import { gameLogic } from './gameLogic.js'
import { gameBoard } from './gameBoard.js'


const computerPlayer = (function() {
    const playMove = function(selectedPlay) {
        if (gameLogic.getGameDone() == true) {
            return null;
        } else {
            const play = 'O';
            const rawIndex = selectedPlay.id.slice(7);
            gameLogic.updatePlaysArr(play, rawIndex);
            gameBoard.updatePlaysDom(selectedPlay, play);

            let numRounds = gameLogic.getNumRounds() + 1;
            gameLogic.setNumRounds(numRounds);

            if (gameLogic.checkForWin() == true) {
                gameBoard.displayWin();
                gameLogic.setGameDone(true);
            } else if (gameLogic.getNumRounds() == 9) {
                gameBoard.displayTie();
            } else {
                gameLogic.changeWhoseTurn();
                gameBoard.displayTurn();
            };
        };
    };
    
    const selectMove = function() {
        let availPlays = [];

        for (let i = 0; i < gameBoard.getSquaresArr().length; i++) {
            let play = gameBoard.getSquaresArr()[i];
            if (play.innerHTML != 'X' && play.innerHTML != 'O') {
                availPlays.push(play)
            };
        };

        let randomIndex = Math.random();
        randomIndex *= availPlays.length;
        randomIndex = Math.floor(randomIndex);

        return availPlays[randomIndex];
    };

    return {playMove, selectMove};
})();

export { computerPlayer };