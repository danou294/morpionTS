var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
function getDiagonals(board) {
    return [board.map(function (row, y) { return row[y]; }), board.map(function (row, y) { return row[2 - y]; })];
}
function getColumns(board) {
    return board.map(function (row, y) { return row.map(function (_, x) { return board[x][y]; }); });
}
function getRows(board) {
    return board;
}
function getOwner(cells) {
    return cells.every(function (cell) { return cell !== null && cell === cells[0]; })
        ? cells[0]
        : null;
}
function getWinner(board) {
    var diagonals = getDiagonals(board);
    var columns = getColumns(board);
    var rows = getRows(board);
    return __spreadArrays(diagonals, columns, rows).reduce(function (winner, cells) {
        return winner || getOwner(cells);
    }, null);
}
function isEven(n) {
    return n % 2 === 0;
}
function getNextPlayer(board) {
    var getEmptyCellCount = function (row) {
        return row.filter(function (cell) { return cell === null; }).length;
    };
    var emptyCellsCount = board.reduce(function (sum, row) { return sum + getEmptyCellCount(row); }, 0);
    return isEven(emptyCellsCount) ? 2 : 1;
}
function play(board, x, y) {
    if (!getWinner(board) && !board[y][x]) {
        return board.map(function (row, rowY) {
            return rowY === y
                ? row.map(function (cell, cellX) { return (cellX === x ? getNextPlayer(board) : cell); })
                : row;
        });
    }
    return board;
}
var board = initialBoard;
var i = 0;
document.querySelectorAll('.case').forEach(function (item) {
    item.addEventListener('click', function (event) {
        i++;
        if (getWinner(board) === null) {
            item.classList.remove("pointer");
            var id = item.id;
            var x = parseInt(id.substr(0, 1));
            var y = parseInt(id.substr(2, 1));
            board = play(board, x, y);
            if (item.classList.contains('croix') == false && item.classList.contains('rond') == false) {
                if (getNextPlayer(board) == 2) {
                    item.classList.add("croix");
                }
                else {
                    item.classList.add("rond");
                }
            }
            if (getWinner(board) != null) {
                var victoireContainer = document.createElement('h1');
                victoireContainer.className = "victoire";
                victoireContainer.textContent = "le joueur " + getWinner(board) + " a gagné !";
                var relancer = document.createElement("a");
                relancer.href = "jeu.html";
                relancer.className = "victoire2";
                relancer.textContent = "RELANCER";
                document.body.append(victoireContainer);
                document.body.append(relancer);
                document.querySelectorAll('.pointer').forEach(function (item2) {
                    item2.classList.remove("pointer");
                });
            }
            if (i === 9 && getWinner(board) == null) {
                var victoireContainer = document.createElement('h1');
                victoireContainer.className = "victoire";
                victoireContainer.textContent = "Egalité ! n'hesitez pas à reesayer !";
                var relancer = document.createElement("a");
                relancer.href = "jeu.html";
                relancer.className = "victoire2";
                relancer.textContent = "RELANCER";
                document.body.append(victoireContainer);
                document.body.append(relancer);
            }
        }
    });
});
//# sourceMappingURL=morpion.js.map