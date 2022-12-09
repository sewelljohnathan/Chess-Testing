
let squareSize = 600/8;
let squares = [];
class Square {
    constructor(color) {
        this.color = color;
        this.piece = null;
        this.isSelected = false;
    }
    draw() {
        
        if (this.isSelected) {
            fill("yellow");
            rect(0, 0, squareSize, squareSize);
            fill(this.color);
            rect(squareSize*0.05, squareSize*0.05, squareSize*0.9, squareSize*0.9);
        } else {
            fill(this.color);
            rect(0, 0, squareSize, squareSize);
        }
        if (this.piece != null) {
            this.piece.draw();
        }
    }
}
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

class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
    }
    draw() {
        rect(squareSize/4, squareSize/4, squareSize/2, squareSize/2);
        if (this.player == 1) {
            fill("black");
            rect(squareSize*(7/16), squareSize*(7/16), squareSize/8, squareSize/8);
        }
    }
}
class Pawn extends Piece {
    draw() {
        fill("red");
        super.draw();
    }
    canMove(curR, curC, targetR, targetC) {
        
        let deltaR = targetR - curR;
        let deltaC = targetC - curC;
        let occupied = squares[targetR*8 + targetC].piece !== null;
        return(
            (deltaR === (this.player === 0? 1: -1) && deltaC === 0 && !occupied) ||
            (deltaR === (this.player === 0? 1: -1) && (deltaC === 1 || deltaC === -1) && occupied) ||

            (deltaR === (this.player === 0? 2: -2) && deltaC === 0 && !occupied && !this.hasMoved)
        );
    }
}
class Rook extends Piece {
    draw() {
        fill("orange");
        super.draw();
    }
    canMove(curR, curC, targetR, targetC) {

        let deltaR = targetR - curR;
        let deltaC = targetC - curC;
        let delta = Math.abs(deltaR);
        let stepR = Math.max(-1, Math.min(deltaR, 1));
        let stepC = Math.max(-1, Math.min(deltaC, 1));

        // Check if the move is straight
        if (deltaR !== 0 && deltaR !== 0) {
            return false;
        }

        // Check intermediate squares
        for (let i = 1; i < delta; i++) {
            if (squares[(curR+stepR*i)*8 + (curC+stepC*i)].piece !== null) {
                return false;
            }
        }
        return true;
    }
}
class Knight extends Piece {
    draw() {
        fill("gold");
        super.draw();
    }
    canMove(curR, curC, targetR, targetC) {
        let deltaR = Math.abs(targetR - curR);
        let deltaC = Math.abs(targetC - curC);

        return (
            (deltaR == 2 && deltaC == 1) ||
            (deltaR == 1 && deltaC == 2)
        );
    }
}
class Bishop extends Piece {
    draw() {
        fill("gray");
        super.draw();
    }
    canMove(curR, curC, targetR, targetC) {
        
        let deltaR = targetR - curR;
        let deltaC = targetC - curC;
        let delta = Math.abs(deltaR);
        let stepR = Math.max(-1, Math.min(deltaR, 1));
        let stepC = Math.max(-1, Math.min(deltaC, 1));

        // Check if the move is diagonal
        if (Math.abs(deltaR) !== Math.abs(deltaC)) {
            return false;
        }
        
        // Check intermediate squares
        for (let i = 1; i < delta; i++) {
            if (squares[(curR+stepR*i)*8 + (curC+stepC*i)].piece !== null) {
                return false;
            }
        }
        return true;
    }
}
class Queen extends Piece {
    draw() {
        fill("green");
        super.draw();
    }
    canMove(curR, curC, targetR, targetC) {
        
        let deltaR = targetR - curR;
        let deltaC = targetC - curC;
        let delta = Math.abs(deltaR);
        let stepR = Math.max(-1, Math.min(deltaR, 1));
        let stepC = Math.max(-1, Math.min(deltaC, 1));

        // Check if the move is straight or diagonal
        if (!(
            (Math.abs(deltaR) === Math.abs(deltaC)) ||
            (deltaR === 0 || deltaC === 0)
        )) {
            return false;
        }
        
        // Check intermediate squares
        for (let i = 1; i < delta; i++) {
            if (squares[(curR+stepR*i)*8 + (curC+stepC*i)].piece !== null) {
                return false;
            }
        }
        return true;
    }
}
class King extends Piece {
    draw() {
        fill("blue");
        super.draw();
    }
    canMove(curR, curC, targetR, targetC) {
        let deltaR = Math.abs(targetR - curR);
        let deltaC = Math.abs(targetC - curC);

        return (
            (deltaR <= 1 && deltaC <= 1)
        );
    }
}

let turnBoard = false;
function init() {
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

let turn = 0;
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
                        console.log(true);
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
                ctx.translate(col*squareSize, (7-row)*squareSize);
            } else {
                ctx.translate(col*squareSize, (row)*squareSize);
            }    
            

            squares[row*8 + col].draw();

            ctx.restore();
        }
    }
}