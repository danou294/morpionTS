type Player = 1 | 2;
type Cell = Player | null;
type Row = Cell[];
type Columns = Cell[];
type Diagonals = Cell[];
type Board = Row[];


let initialBoard: Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
function getDiagonals(board: Board): Diagonals[] {
    return [board.map((row, y) => row[y]), board.map((row, y) => row[2 - y])];
}
function getColumns(board: Board): Columns[] {
    return board.map((row, y) => row.map((_, x) => board[x][y]));
}
function getRows(board: Board): Row[] {
    return board;
}
function getOwner(cells: Cell[]): Player | null {
    return cells.every((cell) => cell !== null && cell === cells[0])
        ? cells[0]
        : null;
}

function getWinner(board: Board): Player | null {
    const diagonals = getDiagonals(board);
    const columns = getColumns(board);
    const rows = getRows(board);
    return [...diagonals, ...columns, ...rows].reduce<Player | null>(
        (winner, cells) => {
            return winner || getOwner(cells);
        },
        null
    );
}
function isEven(n: number): boolean {
    return n % 2 === 0;
}
function getNextPlayer(board: Board): Player {
    const getEmptyCellCount = (row: Row): number =>
        row.filter((cell) => cell === null).length;

    const emptyCellsCount = board.reduce(
        (sum, row) => sum + getEmptyCellCount(row),
        0
    );

    return isEven(emptyCellsCount) ? 2 : 1;
}
function play(board: Board, x: number, y: number): Board {
    if (!getWinner(board) && !board[y][x]) {
        return board.map((row, rowY) =>
            rowY === y
                ? row.map((cell, cellX) => (cellX === x ? getNextPlayer(board) : cell))
                : row
        );
    }
    return board;
}


let board = initialBoard;
let i = 0

document.querySelectorAll('.case').forEach(item => {
    item.addEventListener('click', event => {
        i++
        if (getWinner(board ) === null) {
            item.classList.remove("pointer")
            var id = item.id;
            var x = parseInt(id.substr(0, 1))
            var y = parseInt(id.substr(2, 1))
            board = play(board, x, y)
            if (item.classList.contains('croix') == false && item.classList.contains('rond') == false) {
                if (getNextPlayer(board) == 2) {
                    item.classList.add("croix")
                } else {
                    item.classList.add("rond")
                }
            }
            if (getWinner(board)!= null) {
                let victoireContainer = document.createElement('h1')
                victoireContainer.className = "victoire"
                victoireContainer.textContent = "le joueur " + getWinner(board) + " a gagné !"

                let relancer = document.createElement("a")
                relancer.href = "jeu.html"
                relancer.className = "victoire2"
                relancer.textContent = "RELANCER"
                document.body.append(victoireContainer)
                document.body.append(relancer)

                document.querySelectorAll('.pointer').forEach(item2 => {
                    item2.classList.remove("pointer")
                })
            }
            if (i === 9 && getWinner(board)==null){
                let victoireContainer = document.createElement('h1')
                victoireContainer.className = "victoire"
                victoireContainer.textContent = "Egalité ! n'hesitez pas à reesayer !"

                let relancer = document.createElement("a")
                relancer.href = "jeu.html"
                relancer.className = "victoire2"
                relancer.textContent = "RELANCER"
                document.body.append(victoireContainer)
                document.body.append(relancer)
            }
        }

    })
})
