
class Square {

    static size = 600/8;

    constructor(color) {
        this.color = color;
        this.piece = null;
        this.isSelected = false;
    }
    draw() {
        
        if (this.isSelected) {
            fill("yellow");
            rect(0, 0, Square.size, Square.size);
            fill(this.color);
            
            rect(Square.size*0.05, Square.size*0.05, Square.size*0.9, Square.size*0.9);
        } else {
            fill(this.color);
            rect(0, 0, Square.size, Square.size);
        }
        if (this.piece != null) {
            this.piece.draw();
        }
    }
}

