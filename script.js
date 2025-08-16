
const game = (function Gameboard() {
    let gameboard = [];
    const gameboardSize = 3;

    const getGameboard = function () {
        return gameboard;
    }

    const clearBoard = function () {
        gameboard = [];
    }

    const initGameBoard = function () {
        for (let i = 0; i < gameboardSize; ++i) {
            gameboard[i] = [];
            for (let j = 0; j < gameboardSize; ++j) {
                gameboard[i][j] = Cell();
            }
        }
    }

    const addCellToGameboard = function (cell) {
        gameboard.push(cell)
    }

    const showGameboard = function () {
        console.log('------------- START -------------------');
        for (const row of gameboard) {
            console.log('---------------- ' + gameboard.indexOf(row) + ' -----------------');
            for (const cell of row) {
                console.log(row.indexOf(cell) + ' |' + cell.getMark() + '|');
            }

        }
        console.log('------------- END -------------------');
    }


    const checkRow = function (rowIndex) {
        console.log('checking rows');
        for (let i = 0; i < gameboardSize - 1; ++i) {
            const currentCell = gameboard[rowIndex][i];
            const nextCell = gameboard[rowIndex][i + 1];

            if (currentCell.getMark() !== nextCell.getMark()) {
                return false;
            }
        }
        return true;
    }

    const checkColumn = function (colIndex) {
        console.log('checking columns');
        for (let i = 0; i < gameboardSize - 1; ++i) {
            const currentCell = gameboard[i][colIndex];
            const nextCell = gameboard[i + 1][colIndex];
            if (currentCell.getMark() !== nextCell.getMark()) {
                return false;
            }
        }
        return true;
    }

    const checkPrimaryDiagonal = function () {
        console.log('checking primary diagonal');
        for (let i = 0; i < gameboardSize - 1; ++i) {
            const currentCell = gameboard[i][i];
            const nextCell = gameboard[i + 1][i + 1];
            if (currentCell.getMark() !== nextCell.getMark()) {
                return false;
            }
        }
        return true;
    }

    const checkSecondaryDiagonal = function () {
        console.log('checking secondary diagonal');
        for (let i = 0; i < gameboardSize - 1; ++i) {
            const currentCell = gameboard[i][gameboardSize - 1 - i];
            const nextCell = gameboard[i + 1][gameboardSize - 1 - (i + 1)];
            if (currentCell.getMark() !== nextCell.getMark()) {
                return false;
            }
        }
        return true;
    }


    // if winner found -> return winner mark 
    // else -> return false
    const checkWin = function () {

        for (let i = 0; i < gameboardSize; ++i) {
            // check win on rows and columns -> return the winner(X or O)
            if (checkRow(i)) return gameboard[i][0].getMark();
            if (checkColumn(i)) return gameboard[0][i].getMark()
        }

        if (checkPrimaryDiagonal()) return gameboard[0][0].getMark();
        if (checkSecondaryDiagonal()) return gameboard[0][gameboardSize - 1].getMark();
        return false;
    }

    const allCellsMarked = function () {
        for (let i = 0; i < gameboardSize; ++i) {
            for (let j = 0; j < gameboardSize; ++j) {
                if (gameboard[i][j].getMark() === '')
                    return false;
            }
        }
        return true;
    }

    const updateGameboard = function (row, column, userMark) {
        if (!gameboard[row][column].getMark()) {
            gameboard[row][column].putMark(userMark);
            return true;
        } else {
            alert('Cell taken. Please chose another cell');
            return false;
        }
    }


    const getGameboardSize = function () {
        return gameboardSize;
    }

    return { getGameboard, clearBoard, addCellToGameboard, showGameboard, updateGameboard, initGameBoard, checkWin, allCellsMarked, getGameboardSize };

})();


function Cell() {
    let mark = '';

    const getMark = function () {
        return mark;
    }

    const putMark = function (playerMark) {
        mark = playerMark;
    }

    return { getMark, putMark }
}

function Player(name, mark) {
    let choice = [];
    let score = 2;

    const increaseScore = function () {
        score++;
    }

    const getMark = function () {
        return mark;
    }

    const setChoice = function (arr) {
        choice = arr;
    }

    const getChoice = function () {
        return choice;
    }

    const getName = function () {
        return name;
    }

    const getScore = function () {
        return score;
    }

    const resetScore = function() {
        score = 0;
    }

    return { increaseScore, getMark, getChoice, setChoice, getName, getScore, resetScore }

}


const gameController = (function GameController() {

    const maxScore = 3;
    let playerOne = null;
    let playerTwo = null;
    let currentPlayer = null;
    let isGameRunning = false;
    let isgameFinished= false;
    let winner = null;

    const checkWinner = function () {
        winner = game.checkWin() === currentPlayer.getMark() ? currentPlayer : null;

        if (winner) {
            console.log('Round winner: ', winner.getName());
            return true;
        }
        return false;

    }

    game.initGameBoard();

    const startGame = function (playerOneName, playerTwoName) {

        playerOne = Player(playerOneName, 'X');
        playerTwo = Player(playerTwoName, 'O');
        currentPlayer = playerOne;
        isGameRunning = true;
    }

    const switchCurrentPlayer = function () {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const getCurrentPlayer = function () {
        return currentPlayer;
    }

    const getIsGameRunning = function () {
        return isGameRunning;
    }

    const getIsGameFinished = function() {
        return isgameFinished;
    }

    const getWinner = function() {
        return winner;
    }

    const getPlayerOneScore = function() {
        return playerOne.getScore();
    }

    const getPlayerTwoScore = function() {
        return playerTwo.getScore();
    }

    const getPlayerOneName = function() {
        return playerOne.getName();
    }

    const getPlayerTwoName = function() {
        return playerTwo.getName();
    }

    const gameFinished = function() {
        return playerOne.getScore() === maxScore || playerTwo.getScore() === maxScore
    }

    const playRound = function (row, col) {

        // reset the winner of previous round
        if(winner) winner = null;

        // proceed only if the update is successful
        if (game.updateGameboard(row, col, currentPlayer.getMark())) {
            // check if currentPlayer won
            if (checkWinner()) {
                currentPlayer.increaseScore();
                if(gameFinished()) isgameFinished = true;
                isGameRunning = false;
                return winner;

                // if not - verify if not tie
            } else if (game.allCellsMarked()) {
                // alert("It's a tie");
                console.log(`${currentPlayer.getName()} score: ${currentPlayer.getScore()}`);
                console.log(`${playerTwo.getName()} score: ${playerTwo.getScore()}`);
                isGameRunning = false;
                return 'tie';
            }
            switchCurrentPlayer();
        }

        return false;
    }

    const resetGameboard = function() {
        game.clearBoard();
        game.initGameBoard();
        isGameRunning = true;
    }

    const resetGameState = function() {
        resetGameboard();
        playerOne.resetScore();
        playerTwo.resetScore();
        currentPlayer = playerOne;
        isgameFinished = false;
    }

    return { playRound, startGame, getIsGameRunning, getIsGameFinished, getWinner, getCurrentPlayer, getPlayerOneScore, getPlayerTwoScore, getPlayerOneName, getPlayerTwoName, resetGameboard, resetGameState };
})();


const displayController = (function () {

    const updateFinalWinnerElem = function(winnerName='') {

        const finalWinner = document.getElementById('final-winner');
        finalWinner.textContent += ` ${winnerName}`;

        if(winnerName) {
            finalWinner.classList.remove('hidden');
        } else {
            finalWinner.classList.add('hidden');
        }

    }


    const updateGameMessageElem = function(message) {
        const gameMessage = document.getElementById('game-message');
        gameMessage.textContent = message;
    }

    const updateScoreElements = function () {
        const playerOneScoreElem = document.getElementById('player-one-score');
        const playerTwoScoreElem = document.getElementById('player-two-score');

        playerOneScoreElem.textContent = `👤 ${gameController.getPlayerOneName()}: ${gameController.getPlayerOneScore()}`;
        playerTwoScoreElem.textContent = `👤 ${gameController.getPlayerTwoName()}: ${gameController.getPlayerTwoScore()}`;
    }

    const updateGameboardListener = function (e) {
        if (!gameController.getIsGameRunning() ) {
            e.preventDefault();
            return;
        }

        const row = this.getAttribute("data-row");
        const col = this.getAttribute("data-column");

        const winner = gameController.playRound(row, col);

        let message = '';
        if(winner == 'tie'){
            message = `It's a tie`;
        } else if (winner) {
            message = `🎉 ${winner.getName()} won this round`;
            enableNextRoundButton();
        } else {
            message = `${gameController.getCurrentPlayer().getName()}'s turn`;
        }

        updateGameMessageElem(message);
        updateScoreElements();

        if(gameController.getIsGameFinished()){
            updateFinalWinnerElem(winner.getName());
            enablePlayAgainButton();
            disableNextRoundButton();
        }

        displayGameboard();
    }

    const createCellElement = function (mark, row, column) {
        const cell = document.createElement('div');
        cell.textContent = mark;
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-column', column);

        return cell;
    }

    const displayGameboard = function () {
        const gameboard = game.getGameboard();
        console.log(gameboard)
        const gameboardSize = game.getGameboardSize();
        const gameboardElement = document.querySelector(".gameboard");
        console.log(gameboardElement);
        gameboardElement.innerHTML = '';

        for (let i = 0; i < gameboardSize; ++i) {
            for (let j = 0; j < gameboardSize; ++j) {
                const currentCell = createCellElement(gameboard[i][j].getMark(), i, j);
                currentCell.addEventListener('click', updateGameboardListener);
                gameboardElement.appendChild(currentCell);
            }
        }
    }

    const startGameListener = function () {
        this.setAttribute("disabled", "");
        const playerOneName = document.getElementById("player-one-name").value || 'Player One';
        const playerTwoName = document.getElementById("player-two-name").value || 'Player Two';
        console.log(playerOneName, playerTwoName);

        displayGameboard();
        gameController.startGame(playerOneName, playerTwoName);
        updateScoreElements(playerOneName, playerTwoName);
        updateGameMessageElem(`${playerOneName}'s turn`);

    }

    const nextRoundListener = function() {
        gameController.resetGameboard();
        displayGameboard();
        disableNextRoundButton();
    }

    const enableNextRoundButton = function() {
        nextRoundButton.disabled = false;
    }

    const disableNextRoundButton = function() {
        nextRoundButton.disabled = true;
    }

    const playAgainListener = function() {
        gameController.resetGameState();
        displayGameboard();
        updateScoreElements();
        updateFinalWinnerElem();
        disablePlayAgainButton();
    } 

    const enablePlayAgainButton = function() {
        playAgainButton.disabled = false;
    }

    const disablePlayAgainButton = function() {
        playAgainButton.disabled = true;
    }

    const startGameButton = document.getElementById("start-game");
    startGameButton.addEventListener('click', startGameListener);

    const playAgainButton = document.getElementById('play-again');
    playAgainButton.addEventListener('click', playAgainListener);

    const nextRoundButton = document.getElementById('next-round');
    nextRoundButton.addEventListener('click', nextRoundListener);

    displayGameboard();




})();