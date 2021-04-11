import { gameBoard } from './gameBoard.js'
import { gameLogic } from './gameLogic.js'

const livePlayer = (function() {
    const playMove = function(event) {
        if (gameLogic.getGameDone() == true) {
            return null;
        } else {
            const play = gameLogic.returnPlay();       
            const rawIndex = event.target.id.slice(7);       
            gameLogic.updatePlaysArr(play, rawIndex);
            gameBoard.updatePlaysDom(event, play);

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

    return {playMove};
})();

export { livePlayer };