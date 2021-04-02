const gameBoard = (function() {
    const plays = [null, null, null, null, null, null, null, null, null, null];

    const squares = document.getElementsByClassName('grid-square');
    squaresArr = Array.from(squares);

    const playMove = function(event) {
        event.target.innerHTML = 'X';
    };

    for (let i = 0; i < squaresArr.length; i++) {
        let square = squaresArr[i];
        square.addEventListener('click', playMove);
    }

    // return {squares, playMove};
})();