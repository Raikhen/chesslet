const TRIVIAL_POS = '4/4/4/4'

const TRIVIAL_CONFIG = {
    position: TRIVIAL_POS,
    showNotation: false,
    draggable: true,
    onDrop
}

let currentLevel = 0
let game = new Chess(convertFen(TRIVIAL_POS))
let board = Chessboard('board', TRIVIAL_CONFIG)

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

$(document).ready(() => {
    for (let i = 0; i < LEVELS.length; i++) {
        const done = localStorage.getItem(`level-${i + 1}`)
        const doneText = done ? '✅' : ''

        if (done) {
            currentLevel++
        }

        $('#levels-dropdown').append(
            `<option value="${i + 1}">Level ${i + 1} ${doneText}</option>`
        )
    }

    if (currentLevel == LEVELS.length) {
        currentLevel = 0
    }

    updateDropdown()
    playCurrentLevel()

    const modals = document.getElementsByClassName('modal')

    window.onclick = (event) => {
        for (let i = 0; i < modals.length; i++) {
            if (event.target == modals[i]) {
                modals[i].style.display = 'none'
            }
        }
    }
})

$('#levels-dropdown').on('change', function () {
    currentLevel = parseInt(this.value) - 1
    playCurrentLevel()
    updateDropdown()
})

$('#reset-button').on('click', function () {
    playCurrentLevel()
})

$('#next-level-button').on('click', function () {
    // If we are at the last level, do nothing
    if (currentLevel == LEVELS.length - 1) return

    // Otherwise, increment the level and play it
    currentLevel++
    playCurrentLevel()
    updateDropdown()
})

$('#acknowledgments-btn').on('click', function () {
    $('#acknowledgments-modal').css('display', 'block')
})

$(window).resize(board.resize)

// ---------------------------------------------------------------------------
// Main functions
// ---------------------------------------------------------------------------

function playCurrentLevel() {
    play(LEVELS[currentLevel])
}

// Play from a given position
function play(fen) {
    let convertedFen = convertFen(fen)
    let withTail = addTailToFen(convertedFen)

    game.load(withTail)

    let config = {
        position: fen,
        draggable: true,
        showNotation: false,
        onDrop
    }

    board.position(fen)
}

// What to do when a piece is dropped
function onDrop(from, to) {
    // Does the move eat a piece?
    const atePiece = game.get(to) && from != to

    if (atePiece) {
        // If it does, we need to remove the piece from the board
        // and we need to switch the color of the piece to remove it
        switchColorOfPiece(to)

        // (Try to) make the move
        const move = game.move({ from, to })

        if (move) {
            // Keep white as the first player
            setTurnToWhite()

            // If we managed to make the move, we need to update the board
            let fen = convertFen(game.fen(), true)
            board.fen(fen)

            if (countPieces() == 1) won()

            return
        }

        // If we couldn't make the move, we need to restore the color of the piece
        switchColorOfPiece(to, true)
    }

    return 'snapback'
}

function countPieces() {
    return game.board().flat().filter(y => y).length
}

function won() {
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min
    }
    
    confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 }
    })

    const done = localStorage.setItem(`level-${currentLevel + 1}`, 'done')
    $(`option[value="${currentLevel + 1}"]`).text(`Level ${currentLevel + 1} ✅`)

    if (completedAllLevels()) {
        finished()
    }
}

function completedAllLevels() {
    for (let i = 0; i < LEVELS.length; i++) {
        if (!localStorage.getItem(`level-${i + 1}`)) {
            return false
        }
    }

    return true
}

function finished() {
    // If we have already finished, do nothing
    if (localStorage.getItem('finished'))return

    // Otherwise, show the modal
    $('#game-completed-modal').css('display', 'block')
    localStorage.setItem('finished', 'true')
}

// Update dropdown to match the current level
function updateDropdown() {
    $('#levels-dropdown').val(currentLevel + 1)

    // Disable the button if we are at the last level
    if (currentLevel == LEVELS.length - 1) {
        $('#next-level-button').attr('disabled', 'disabled')
    } else {
        $('#next-level-button').removeAttr('disabled')
    }
}

/*
function allPiecesTo(puzzle, color = 'White') {
    let fen = puzzle.fen()
    let rows = expandFenEmptySquares(fen).split('/')
    let toWhite = color == 'White'

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const square = 'abcd'[i] + j;

            // Get the indices of the square to be modified
            let rowId = 8 - parseInt(square[1])
            let colId = square.charCodeAt(0) - 97

            // Modify the square
            let row = rows[rowId]
            let newChar = toWhite ? row[colId].toUpperCase() : row[colId].toLowerCase()
            let newRow = row.slice(0, colId) + newChar + row.slice(colId + 1, 8)
            rows[rowId] = newRow
        }
    }

    // Compute the new FEN string and load it
    let newFen = addTailToFen(squeezeFenEmptySquares(rows.join('/')))
    puzzle.load(newFen)
}

function getMoves(fen) {
    let puzzle = new Chess(convertFen(fen))

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const move = 'abcd'[i] + j;

            if (puzzle.get({ 'square': move })) {
                
            }
        }
    }
}

function isPuzzleValid(fen) {
    let puzzle = new Chess(convertFen(fen))

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (puzzle.get('abcd'[i] + j)) {

            }
        }
    }
}
*/

// ---------------------------------------------------------------------------
// FEN Utilities
// ---------------------------------------------------------------------------

// Keep white as the first player
function setTurnToWhite() {
    let fen = game.fen()
    let newFen = fen.split(' ')[0] + ' w - - 0 1'
    game = new Chess(newFen)
}

// Switch the color of a piece in a given square
function switchColorOfPiece(square, toWhite = false) {
    // Get the rows separately
    let fen = game.fen()
    let rows = expandFenEmptySquares(fen).split('/')

    // Get the indices of the square to be modified
    let rowId = 8 - parseInt(square[1])
    let colId = square.charCodeAt(0) - 97

    // Modify the square
    let row = rows[rowId]
    let newChar = toWhite ? row[colId].toUpperCase() : row[colId].toLowerCase()
    let newRow = row.slice(0, colId) + newChar + row.slice(colId + 1, 8)
    rows[rowId] = newRow

    // Compute the new FEN string and load it
    let newFen = addTailToFen(squeezeFenEmptySquares(rows.join('/')))
    game.load(newFen)
}

/*  This function adds the tail of the FEN string if it's missing. */
function addTailToFen(fen) {
    if (fen.trim().split(' ').length == 1) {
        return fen + ' w - - 0 1'
    } else {
        return fen
    }
}

/*  This function converts the short FEN string into a longer one that chess.js
    can understand and viceversa. */
function convertFen(fen, extend = true) {
    let parts = fen.split(' ')
    let pos = parts[0]
    let rest = parts.slice(1).join(' ')

    let chunks = pos.split('/').map(row => {
        let rightmost = row.at(-1)

        if (/^\d+$/.test(rightmost)) {
            let asInt = parseInt(rightmost)
            let correctBy = extend ? 8 - BOARD_SIZE : BOARD_SIZE - 8
            let corrected = asInt + correctBy
            
            return row.slice(0, -1) + corrected.toString()
        } else {
            if (extend) {
                return row + (8 - BOARD_SIZE).toString()
            } else {
                return row.slice(0, BOARD_SIZE - 8)
            }
        }
    })

    if (extend) {
        while (chunks.length < 8) chunks.unshift('8')
    } else {
        chunks = chunks.slice(0, BOARD_SIZE)
    }
    
    return chunks.join('/') + ' ' + rest
}

// ---------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------

const LEVELS = [
    '4/1K2/2P1/3P',
    'QP2/2P1/3B/1RK1',
    '4/R2R/2R1/N3',
    '1PBP/R1NN/P2N/BBKN',
    'Q3/2N1/N1R1/1P2',
    '1R1B/1P1K/4/N1N1',
    '3B/P1P1/NP2/3N',
    'N3/N1R1/4/1B2',
    '2P1/N1P1/1P2/1P1P',
    '4/RP1R/4/1NN1',
    'R1NN/2BP/KP2/2P1',
    '3P/PB1K/1P2/2QR',
    'K3/4/1NB1/R2P',
    '4/N2P/2R1/1P2',
    'KP1N/1P1B/3R/BPBB',
    '3B/1NN1/4/R2P',
    'P1B1/2BN/KP2/1P2',
    'RK1B/PR2/P1P1/1BP1',
    '1P1P/P1P1/N1N1/B3',
    '4/1NR1/3P/BB2',
    'Q3/2N1/Q3/3P',
    'Q1N1/4/1P2/P2P',
    '1P1R/4/NP1P/BP2',
    'B1RN/2P1/N2R/1BP1',
    '1Q2/3Q/Q1P1/N1Q1',
    'RP2/2NP/PN2/2PR',
    '2KR/1B2/B1R1/1N1N',
    '1NN1/2PB/1P1P/4',
    '2KR/NP2/P1R1/1N2',
    'N2N/1PP1/1PP1/N2N',
]

function generateRandomLevel() {
    let pieces = fakeItTillYouMakeIt()
    let board = []

    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = []

        for (let j = 0; j < BOARD_SIZE; j++) {
            let piece = pieces[Math.floor(Math.random() * pieces.length)]
            row.push(piece)
        }

        board.push(row.join(''))
    }

    return squeezeFenEmptySquares(board.join('/'))
}

function fakeItTillYouMakeIt() {
    let pieces = ['K', 'Q', 'R', 'B', 'N', 'P', '1']
    let weights = [1, 1, 2, 2, 2, 4, 12]

    let res = []

    for (let i = 0; i < pieces.length; i++) {
        while (weights[i]--) {
            res.push(pieces[i])
        }
    }

    return res
}