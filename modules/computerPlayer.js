import { gameLogic } from './gameLogic.js'
import { gameBoard } from './gameBoard.js'


const computerPlayer = (function() {
    const playMove = function(selectedPlay) {
        if (gameLogic.getGameDone() == true) {
            return null;
        } else {
            const play = 'O';
            const row = Number(selectedPlay.id.slice(7,8));
            const col = Number(selectedPlay.id.slice(8,9));  
            gameLogic.updatePlaysMatr(play, row, col);
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

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let play = gameBoard.getSquaresMatr()[row][col];
                if (play.innerHTML != 'X' && play.innerHTML != 'O') {
                    availPlays.push(play)
                };
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