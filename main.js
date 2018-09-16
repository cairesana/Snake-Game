var game = {};

game.canvas = document.getElementById("myCanvas");
game.frameRate = 100; // velocidade do jogo - tempo que atualizo a tela milisegundos
game.snake = {
                direction: 'south',
                bodyPartSize: 12,
                body: [
                        {x:400, y:20},     // create two balls = snake's head
                        {x:400, y:8}
                ]
        };

game.apples = [];

// create boardgame using canvas
var ctx = game.canvas.getContext("2d"); // getContext() is a built-in html object, with properties and methods for drawing. ctx var will store the 2D rendering context (the actual tool we can use to paint on the Canvas).
        
// draw apple in canvas (snake's food colored ball): 
// create apple random location
function createNewApple() { 
        var randomX = Math.floor(Math.random() * Math.floor(800)); //(max): 800 x 600 = tamanho maximo (myCanvas)
        var randomY = Math.floor(Math.random() * Math.floor(600));

        game.apples.push({x: randomX, y: randomY}); // saves apple in apple's []
}

function drawApple() {
        game.apples.forEach(function(element) {
                ctx.beginPath();    // starts with beginPath and ends with closePath methods.. 
                ctx.arc(element.x, element.y, 3, 0, Math.PI*2, true); // (x, y (coordinates of arc's center in radious), start angle, end angle (to start and finish drawing in radians), direction of drawing, false: clockwise, true: anti-clockwise)
                ctx.fillStyle = "rgba(0, 255, 0, 1)"; // fillStyle property stores a color that will be used by the fill() method 
                ctx.fill(); // paints the circle
                ctx.strokeStyle = "rgba(0, 120, 0, 1)"; // rgba - red green blue alpha (a= opacity) - border's color
                ctx.stroke(); // add border 
                ctx.closePath();
        });
}
        

// draw snake 
var initialSnake = game.canvas.getContext("2d");

function drawSnake() {
        game.snake.body.forEach(function (element) {
                initialSnake.beginPath();
                initialSnake.arc(element.x, element.y, game.snake.bodyPartSize, 0, Math.PI*2, true);
                initialSnake.fillStyle = "rgba(255, 255, 255, 1)";
                initialSnake.fill();
                initialSnake.closePath();
        });
}

function moveSnake() {
        var snakeBody = game.snake.body;
        var newX; 
        var newY;

        switch (game.snake.direction) {
                case 'north': // cima -- decrementa o y e permanece x igual
                        newX = snakeBody[0].x;  // [0] = getting sneak's head (first ball)
                        newY = snakeBody[0].y - game.snake.bodyPartSize;
                        break;
                case 'east': // direita -- incrementa o x e permanece y igual
                        newX = snakeBody[0].x + game.snake.bodyPartSize;
                        newY = snakeBody[0].y;
                        break;
                case 'south': // baixo -- incrementa o y e permanece x igual
                        newX = snakeBody[0].x;
                        newY = snakeBody[0].y + game.snake.bodyPartSize;
                        break;
                case 'west': // esquerda -- decrementa o x e permanece y igual
                        newX = snakeBody[0].x - game.snake.bodyPartSize;
                        newY = snakeBody[0].y;
                        break;
        }
        snakeBody.pop();
        snakeBody.push({x: newX, y: newY});
        snakeBody.reverse();
        //console.log(game.snake.body);
}


// collision detector 
function collisionDetector() {
        // Detect colisao com a maca
        game.apples.forEach(function(element) {
                if (
                    (element.x >= game.snake.body[0].x && (element.x + 1.5) <= (game.snake.body[0].x + game.snake.bodyPartSize))
                    && (element.y >= game.snake.body[0].y && (element.y + 1.5) <= (game.snake.body[0].y + game.snake.bodyPartSize))
                ) {
                        console.log(true);
                        console.log(element, game.snake.body[0]);
                }
        });
}

// funcao comer maca - cresce cobra e some maca 
// function eatApple() {

// }

//setInterval(drawSnake, 10); //execute draw function every 10 miliseconds - instead setinterval, I could also apply requestAnimationFrame().
function execGameLoop() {
        ctx.clearRect(0, 0, 800, 600);
        collisionDetector();
        moveSnake();
        drawSnake();
        if(game.apples.length < 3) {
                createNewApple();
        }
        drawApple();
        setTimeout(execGameLoop, game.frameRate);
}

execGameLoop();

document.addEventListener('keydown', function(event) {
        //console.log(event);
        var keyCode = event.keyCode;

        switch (game.snake.direction) {
                case 'north':
                case 'south': //quando indo p/baixo so pode virar pra esq ou dir
                        switch (keyCode) {
                                case 37: //tecla left
                                        game.snake.direction = 'west';
                                        event.preventDefault(); //impede de rolar  tela com tecla seta
                                        break;
                
                                case 39: //tecla right
                                        game.snake.direction = 'east';
                                        event.preventDefault();
                                        break;

                                case 38: 
                                case 40: 
                                        event.preventDefault();
                                        break;
                        }
                        break;

                case 'west':
                case 'east': //quando indo p/baixo so pode virar pra esq ou dir
                        switch (keyCode) {            
                                case 38: //tecla up
                                        game.snake.direction = 'north';
                                        event.preventDefault();
                                        break; 
                     
                                case 40: // tecla down
                                        game.snake.direction = 'south';
                                        event.preventDefault();
                                        break;
                                case 37: 
                                case 39: 
                                        event.preventDefault();
                                        break;
                        }
                break;
        }
        

        
});
