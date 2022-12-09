
// mouse position
var mouseX;
var mouseY;
canvas.onmousemove = (e) => {
    mouseX = e.clientX - canvas.getBoundingClientRect().x;
    mouseY = e.clientY - canvas.getBoundingClientRect().y;
}

// Draw functions
function fill(c) {
    ctx.fillStyle = c;
}
function rect(x, y, w, h) {
    ctx.fillRect(x, y, w, h);
}