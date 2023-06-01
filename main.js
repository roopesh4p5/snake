

let canvas = document.getElementById('snake');
canvas.width = 800;
canvas.height = 600;
let c = canvas.getContext('2d');
let gameEnd = false;

var snakesegment = [];
var snakeLength = 3;
let score =0;
let snakex = 10;
let snakey = 10;

let dots = [];
let points=0;

let directionx = 0;
let directiony = 0;

let movesnake = () => {
    snakesegment.unshift({ x: snakex, y: snakey });
    snakex += directionx;
    snakey += directiony;

    if (snakesegment.length > snakeLength) {
        snakesegment.pop();
    }

    // console.log(snakesegment);
};

let drawsnake = () => {
    c.fillStyle = "blue";
    for (let i = 0; i < snakesegment.length; i++) {
        c.fillRect(snakesegment[i].x, snakesegment[i].y, 10, 10);
    }
};

let gameloop = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    movesnake();
    drawsnake();
    spawnDots();
    collision();
    if (!gameEnd) {
        requestAnimationFrame(gameloop);
    }
};



document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (directionx !== 3) {
                directionx = -3;
                directiony = 0;
            }
            break;
        case 38: // Up arrow
            if (directiony !== 3) {
                directionx = 0;
                directiony = -3;
            }
            break;
        case 39: // Right arrow
            if (directionx !== -3) {
                directionx = 3;
                directiony = 0;
            }
            break;
        case 40: // Down arrow
            if (directiony !== -3) {
                directionx = 0;
                directiony = 3;
            }
            break;
    }
};


spawnDots = () => {
    if (dots.length < 5) {
        var dotx = (Math.random() * canvas.width);
        var doty = (Math.random() * canvas.height);
        dots.push({ x: dotx, y: doty });
        console.log(dots);
    }
    for (let i = 0; i < dots.length; i++) {
        c.fillStyle = 'red';
        c.fillRect(dots[i].x, dots[i].y, 15, 15);
        console.log(c);
    }
}


gmaeover = (points) => {
    // alert("GAMEOVER")
    setTimeout(function () {
        
        alert("GAMEOVER!");
        alert("Your Score is : "+points);
        
    }, 500);
    gameEnd=TRUE;
}



collision = () => {
    for (let i = 0; i < dots.length; i++) {
        if (snakex < dots[i].x + 10 &&
            snakex + 10 > dots[i].x &&
            snakey < dots[i].y + 10 &&
            snakey + 10 > dots[i].y) {
            snakeLength += 3;
            points++;
            dots.splice(i, 1);
            return points;
        }
        if (snakex < -10 || snakey < -10 || snakex > canvas.width + 10 || snakey > canvas.height + 10) {
            gmaeover(points);
            // console.log("hello");
            // alert("GAMEOVER!")
        }
    }
}





gameloop();

