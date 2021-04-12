import { gameBoard } from './gameBoard.js'
import { gameLogic } from './gameLogic.js'
import { computerPlayer } from './computerPlayer.js'

const livePlayer = (function() {
    const playMove = function(event) {
        if (gameLogic.getGameDone() == true || gameLogic.getWhoseTurn() == -1) {
            return null;
        } else {
            const play = 'X';       
            const rawIndex = event.target.id.slice(7);       
            gameLogic.updatePlaysArr(play, rawIndex);
            gameBoard.updatePlaysDom(event.target, play);

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
                let computerMove = computerPlayer.selectMove();
                window.setTimeout(function() {
                    computerPlayer.playMove(computerMove)
                    }, 1000);
            };
        };
    };

    return {playMove};
})();

export { livePlayer };