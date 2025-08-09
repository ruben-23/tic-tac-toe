
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

    const updateGameboard = function (row, column, userMark) {
        if (!gameboard[row][column].getMark()) {
            gameboard[row][column].putMark(userMark);
        } else {
            alert('Cell taken. Please chose another cell');
        }
    }

    return { getGameboard, clearBoard, addCellToGameboard, showGameboard, updateGameboard, initGameBoard, checkWin };

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

const gameController = (async function GameController() {

    game.initGameBoard();

    let userX = {
        name: 'miau',
        choice: [],
        mark: 'X'
    };

    let userO = {
        name: 'miau',
        choice: [],
        mark: 'O'
    };

    let winner = null;
    while (!winner) {
        console.clear();
        game.showGameboard()

        userX.choice = prompt('Enter the row and column (e.g. 1 1)').split(' ').map(Number);
        // TODO: implement check if the user cancels the prompt
        // TODO: implement check if the input is outside the gameboard 
        const [rowX, colX] = userX.choice;
        game.updateGameboard(rowX, colX, userX.mark);
        console.clear();
        game.showGameboard()
        winner = game.checkWin();

        if (winner) break;

        await new Promise(resolve => setTimeout(resolve, 3000));

        userO.choice = prompt('Enter the row and column (e.g. 1 1)').split(' ').map(Number);
        const [rowO, colO] = userO.choice;

        game.updateGameboard(rowO, colO, userO.mark);

        console.clear();
        game.showGameboard()

        winner = game.checkWin();
        await new Promise(resolve => setTimeout(resolve, 3000));

    }
    if (winner) console.log('Winner: ', winner);

    // game.clearBoard();
    // game.initGameBoard();
    // game.showGameboard();

})();

