const canvas = document.getElementById('canvas-logo');
const ctx = canvas.getContext('2d')

canvas.width = 64;
canvas.height = 64;

const getWidth = ()=>window.innerHeight
const getHeight = ()=>window.innerHeight

const setCanvasDimensions = ()=>{
    canvas.width = getWidth();
    canvas.height = getHeight()
}
const rand = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
const paint= ()=>{
    ctx.scale(0.15, 0.15);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgb(73, 51, 218)");
    gradient.addColorStop(0.2, "rgb(143, 130, 231)");
    gradient.addColorStop(0.5, "rgb(168, 157, 238)");
    gradient.addColorStop(1, "rgb(206, 194, 218)");

    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.arc(170, 200, 135, 0, 360);
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.fillStyle = "lightgrey"
    ctx.setLineDash([]);
    ctx.strokeStyle = "black"
    ctx.fillRect(130, 120, 30, 140) 
    ctx.strokeRect(130, 120, 30, 140);
   
    ctx.beginPath();
    ctx.moveTo(120, 100); // punkt początkowy zewnętrznej krawędzi
    ctx.bezierCurveTo(200, 100, 240, 160, 220, 300);
    ctx.lineTo(200, 300);
    // Wewnętrzna krzywa Béziera (w odwrotnej kolejności)
    ctx.bezierCurveTo(210, 160, 170, 120, 120, 120);
   
    ctx.closePath(); // zamykamy kształt
    ctx.fillStyle = "rgb(21, 34, 46)";
    ctx.fill();

}
paint()
