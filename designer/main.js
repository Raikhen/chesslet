const TRIVIAL_POS = '4/4/4/4'

const CONFIG = {
    position: TRIVIAL_POS,
    showNotation: false,
    sparePieces: true,
    dropOffBoard: 'trash',
    onChange
}

let board = Chessboard('board', CONFIG)

function onChange(oldPos, newPos) {
    let newFen = Chessboard.objToFen(newPos)
    $('#fen').text(newFen)
}