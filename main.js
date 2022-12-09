
// Generate grid
let squares = [];
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

        let color;
        if ((row + col+1) % 2 == 1) {
            color = "white";
        } else {
            color = "black";
        }

        squares.push(new Square(color))
    }
}

// Initialize board
let turnBoard = false;
let turn = 0;
function init() {

    // White
    squares[1*8 + 0].piece = new Pawn(0);
    squares[1*8 + 1].piece = new Pawn(0);
    squares[1*8 + 2].piece = new Pawn(0);
    squares[1*8 + 3].piece = new Pawn(0);
    squares[1*8 + 4].piece = new Pawn(0);
    squares[1*8 + 5].piece = new Pawn(0);
    squares[1*8 + 6].piece = new Pawn(0);
    squares[1*8 + 7].piece = new Pawn(0);
    squares[0*8 + 0].piece = new Rook(0);
    squares[0*8 + 7].piece = new Rook(0);
    squares[0*8 + 1].piece = new Knight(0);
    squares[0*8 + 6].piece = new Knight(0);
    squares[0*8 + 2].piece = new Bishop(0);
    squares[0*8 + 5].piece = new Bishop(0);
    squares[0*8 + 3].piece = new King(0);
    squares[0*8 + 4].piece = new Queen(0);

    // Black
    squares[6*8 + 0].piece = new Pawn(1);
    squares[6*8 + 1].piece = new Pawn(1);
    squares[6*8 + 2].piece = new Pawn(1);
    squares[6*8 + 3].piece = new Pawn(1);
    squares[6*8 + 4].piece = new Pawn(1);
    squares[6*8 + 5].piece = new Pawn(1);
    squares[6*8 + 6].piece = new Pawn(1);
    squares[6*8 + 7].piece = new Pawn(1);
    squares[7*8 + 0].piece = new Rook(1);
    squares[7*8 + 7].piece = new Rook(1);
    squares[7*8 + 1].piece = new Knight(1);
    squares[7*8 + 6].piece = new Knight(1);
    squares[7*8 + 2].piece = new Bishop(1);
    squares[7*8 + 5].piece = new Bishop(1);
    squares[7*8 + 3].piece = new King(1);
    squares[7*8 + 4].piece = new Queen(1);
}

// Clicking
let selectedR;
let selectedC;
let selectedSquare = null;
canvas.addEventListener("mousedown", (e) => {

    squares.forEach((s) => {
        s.isSelected = false;
    });

    let targetR;
    if (turn === 0 || !turnBoard) {
        targetR = 7 - Math.floor(mouseY / (600/8));
    } else {
        targetR = Math.floor(mouseY / (600/8));
    }
    
    let targetC = Math.floor(mouseX / (600/8));
    let targetSquare = squares[targetR*8 + targetC];
    let targetPiece = targetSquare.piece;

    if (selectedSquare === null) {
        if (targetPiece !== null && targetPiece.player === turn) {
            selectedR = targetR;
            selectedC = targetC;
            selectedSquare = targetSquare;
            squares[targetR*8 + targetC].isSelected = true;
        }
    } else {
        let selectedPiece = selectedSquare.piece;

        // Check to make sure the move was legal
        if (!(targetR - selectedR === 0 && targetC - selectedC === 0) && // Not move to same square
            !(targetPiece !== null && targetPiece.player === turn) && // Not move to overlap another piece of same player
            selectedPiece.canMove(selectedR, selectedC, targetR, targetC)) { // Not illegal move
            
            selectedSquare.piece = null;
            targetSquare.piece = selectedPiece;

            // Check to make sure the move didnt go to check
            let isInCheck = false;
            let kingR;
            let kingC;
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    let curPiece = squares[row*8 + col].piece;
                    if (curPiece !== null && curPiece.player === turn && (curPiece instanceof King)) {
                        kingR = row;
                        kingC = col;
                    }
                }
            }
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    let curPiece = squares[row*8 + col].piece;
                    if (curPiece === null) {
                        continue;
                    }
                    if (curPiece.player !== turn && curPiece.canMove(row, col, kingR, kingC)) {
                        isInCheck = true;
                    }
                }
            }
            // Reverse Move
            if (isInCheck) {
                selectedSquare.piece = selectedPiece;
                targetSquare.piece = targetPiece;
            } else {
                // Turn change
                selectedPiece.hasMoved = true;
                turn = turn === 0? 1 : 0;
            } 
        }

        selectedSquare = null;
    }
});

function run() {

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            ctx.save();

            if (turn === 0 || !turnBoard) {
                ctx.translate(col*Square.size, (7-row)*Square.size);
            } else {
                ctx.translate(col*Square.size, (row)*Square.size);
            }       

            squares[row*8 + col].draw();

            ctx.restore();
        }
    }
}