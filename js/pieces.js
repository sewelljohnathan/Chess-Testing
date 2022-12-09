

class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
    }
    draw() {
        rect(Square.size/4, Square.size/4, Square.size/2, Square.size/2);
        if (this.player == 1) {
            fill("black");
            rect(Square.size*(7/16), Square.size*(7/16), Square.size/8, Square.size/8);
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
