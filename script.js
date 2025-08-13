
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
        } else {
            alert('Cell taken. Please chose another cell');
        }
    }

    return { getGameboard, clearBoard, addCellToGameboard, showGameboard, updateGameboard, initGameBoard, checkWin, allCellsMarked };

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
    let score = 0;

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

    return { increaseScore, getMark, getChoice, setChoice, getName, getScore }

}


const gameController = (async function GameController() {

    const checkWinner = function () {
        const winner = game.checkWin();

        if (winner) {
            console.log('Round winner: ', winner);
            return true;
        }
        return false;

    }
    
    const maxScore = 3;

    game.initGameBoard();

    let playerOneName = prompt('Enter your name: ');
    alert(`${playerOneName} will be X`);
    let playerTwoName = prompt('Enter your name: ');
    alert(`${playerTwoName} will be Y`);

    let playerOne = Player(playerOneName, 'X');
    let playerTwo = Player(playerTwoName, 'O');

    while (playerOne.getScore() !== maxScore && playerTwo.getScore() !== maxScore) {
        console.clear();
        game.showGameboard()

        playerOneChoice = prompt('Enter the row and column (e.g. 1 1)').split(' ').map(Number);
        // TODO: implement check if the user cancels the prompt
        // TODO: implement check if the input is outside the gameboard 

        playerOne.setChoice(playerOneChoice);
        const [rowX, colX] = playerOne.getChoice();

        game.updateGameboard(rowX, colX, playerOne.getMark());
        console.clear();
        game.showGameboard()

        // check if playerOne won
        if (checkWinner()) {
            playerOne.increaseScore();
            console.log(`${playerOne.getName()} score: ${playerOne.getScore()}`);
            console.log(`${playerTwo.getName()} score: ${playerTwo.getScore()}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            game.clearBoard();
            game.initGameBoard();

            // if not: 1. verify if not tie
        } else if (game.allCellsMarked()) {
            console.log("It's a tie");
            console.log(`${playerOne.getName()} score: ${playerOne.getScore()}`);
            console.log(`${playerTwo.getName()} score: ${playerTwo.getScore()}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            game.clearBoard();
            game.initGameBoard();

            //2. ask player two
        } else {
            playerTwoChoice = prompt('Enter the row and column (e.g. 1 1)').split(' ').map(Number);

            playerTwo.setChoice(playerTwoChoice);
            const [rowO, colO] = playerTwo.getChoice();

            game.updateGameboard(rowO, colO, playerTwo.getMark());

            console.clear();
            game.showGameboard();

            // check if playerTwo won
            if (checkWinner()) {
                playerTwo.increaseScore();
                console.log(`${playerOne.getName()} score: ${playerOne.getScore()}`);
                console.log(`${playerTwo.getName()} score: ${playerTwo.getScore()}`);
                await new Promise(resolve => setTimeout(resolve, 5000));
                game.clearBoard();
                game.initGameBoard();

                // verify if not tie
            } else if (game.allCellsMarked()) {
                console.log("It's a tie");
                console.log(`${playerOne.getName()} score: ${playerOne.getScore()}`);
                console.log(`${playerTwo.getName()} score: ${playerTwo.getScore()}`);
                await new Promise(resolve => setTimeout(resolve, 5000));
                game.clearBoard();
                game.initGameBoard();
            }
        }
    }

    let finalWinner = playerOne.getScore() === maxScore ? playerOne.getName() : playerTwo.getName();
    console.log('Final Winner: ', finalWinner);

    return { startGame };
})();

