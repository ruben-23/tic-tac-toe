
const game = (function Gameboard() {
    let gameboard = [];

    const getGameboard = function () {
        return gameboard;
    }

    const clearBoard = function () {
        gameboard = [];
    }

    const addCellToGameboard = function (cell) {
        gameboard.push(cell)
    }

    const showGameboard = function () {
        for (const cell of gameboard) {
            console.log('___');
            console.log('|' + cell.getMark() + '|');
            console.log('___');
        }
    }

    const updateGameboard = function(cellIndex, userMark){
        gameboard[cellIndex].putMark(userMark);
    }

    return { getGameboard, clearBoard, addCellToGameboard, showGameboard, updateGameboard };

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

const gameController = (function GameController() {
    const ROWS = 3;
    const COLS = 3;

    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLS; ++j) {
            game.addCellToGameboard(Cell());
        }
    }

    // for (const cell of game.getGameboard()) {
    //     console.log('___');
    //     console.log('|' + cell.getMark() + '|');
    //     console.log('___');
    // }

    game.updateGameboard(5, 'O');
    game.updateGameboard(4, 'X');

    game.showGameboard();


})();

