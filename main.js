var game = {};

game.canvas = document.getElementById("myCanvas");
game.frameRate = 100; // velocidade do jogo - tempo que atualizo a tela milisegundos
game.snake = {
                direction: 'south',
                bodyPartSize: 12,
                body: [
                        {x:400, y:80},     // create two balls = snake's head
                        {x:400, y:68}
                ]
        };

game.apples = [];
game.gameOver = 0; // 0 = false

var score = 0;

// create boardgame using canvas
var ctx = game.canvas.getContext("2d"); // getContext() is a built-in html object, with properties and methods for drawing. ctx var will store the 2D rendering context (the actual tool we can use to paint on the Canvas).

// borders
var canvasBorder = game.canvas.getContext("2d");

function drawBorders() {
        canvasBorder.beginPath();
        canvasBorder.strokeStyle="red";
        canvasBorder.lineWidth=10;
        canvasBorder.rect(5, 40, 790, 555); //(x,y,width,height);
        canvasBorder.stroke();
        canvasBorder.closePath();
};


// draw apple in canvas (snake's food colored ball): 
// create apple random location
function createNewApple() { 
        var randomX = Math.floor(Math.random() * Math.floor(800)); //(max): 800 x 600 = tamanho maximo (myCanvas)
        var randomY = Math.floor(Math.random() * Math.floor(600));

        game.apples.push({x: randomX, y: randomY}); //saves apple in apple's []
}

var canvasApple = game.canvas.getContext("2d");
function drawApple() {
        game.apples.forEach(function(element) {
                canvasApple.beginPath();    // starts with beginPath and ends with closePath methods.. 
                canvasApple.arc(element.x, element.y, 3, 0, Math.PI*2, true); // (x, y (coordinates of arc's center in radious), start angle, end angle (to start and finish drawing in radians), direction of drawing, false: clockwise, true: anti-clockwise)
                canvasApple.fillStyle = "rgba(0, 255, 0, 1)"; // fillStyle property stores a color that will be used by the fill() method 
                canvasApple.fill(); // paints the circle
                canvasApple.strokeStyle = "rgba(0, 0, 0, 0)"; // rgba - red green blue alpha (a= opacity) - border's color
                canvasApple.stroke(); // add border
                canvasApple.lineWidth=0;
                canvasApple.closePath();
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
        var newX; 
        var newY;

        switch (game.snake.direction) {
                case 'north': // cima -- decrementa o y e permanece x igual
                        newX = game.snake.body[0].x;  // [0] = getting sneak's head (first ball)
                        newY = game.snake.body[0].y - game.snake.bodyPartSize;
                        break;
                case 'east': // direita -- incrementa o x e permanece y igual
                        newX = game.snake.body[0].x + game.snake.bodyPartSize;
                        newY = game.snake.body[0].y;
                        break;
                case 'south': // baixo -- incrementa o y e permanece x igual
                        newX = game.snake.body[0].x;
                        newY = game.snake.body[0].y + game.snake.bodyPartSize;
                        break;
                case 'west': // esquerda -- decrementa o x e permanece y igual
                        newX = game.snake.body[0].x - game.snake.bodyPartSize;
                        newY = game.snake.body[0].y;
                        break;
        }

                game.snake.body.pop();
                game.snake.body.unshift({x: newX, y: newY});
                // game.snake.body.reverse();
                //console.log(game.snake.body);
        
}


// collision detector 
function collisionDetector() {
        // Detect colisao com a maca
        game.apples.forEach(function(element, index, object) {
                if (
                    (element.x >= game.snake.body[0].x && (element.x + 1.5) <= (game.snake.body[0].x + game.snake.bodyPartSize))
                    && (element.y >= game.snake.body[0].y && (element.y + 1.5) <= (game.snake.body[0].y + game.snake.bodyPartSize))
                ) {
                        removeApple(index, object);
                        growSnake();
                        score++;
                }
        });

        // detect collision with borders -- x.left(20) - x.right(780) - y.top(55) - y.bottom(580)
        if (game.snake.body[0].x < 20 || game.snake.body[0].x > 780 || game.snake.body[0].y < 55 || game.snake.body[0].y > 580) { 
                console.log("GAME OVER");
                drawGameOverMessage();
                drawPlayAgainMessage();
                game.gameOver = 1; // 1 = true
        }
}

// apple gets removed when collision is detected  
function removeApple(index, object) {
        object.splice(index, 1);
        console.log(object, index);  //remover depois
}

//after eating apple snakes get bigger   
function growSnake() {
        var snakeLastBodyPart = game.snake.body[game.snake.body.length - 1];
        var newBodyPartX;
        var newBodyPartY;
        //console.log(snakeLastBodyPart);
             
        game.snake.body.splice(game.snake.body.length, 0, {x: newBodyPartX, y: newBodyPartY});
        //console.log("grow snake", game.snake.body);
} 

// draws a "game over" message (collision with border for now; for the future: also on snakes own body) 
var gameOverMessage = game.canvas.getContext('2d');

function drawGameOverMessage() {
        gameOverMessage.font = '60px Sans-serif';
        gameOverMessage.fillStyle = 'rgb(27, 28, 28)';  
        gameOverMessage.fillText('Game Over', 280, 300);
      }

// Play again message
var playAgainMsg = game.canvas.getContext('2d');

var gradientPlayAgain = playAgainMsg.createLinearGradient(0,0,game.canvas.width,0);

function drawPlayAgainMessage() {
        playAgainMsg.font = '40px San serif';
        // playAgainMsg.strokeStyle="rgb(0, 0, 255)";
        //playAgainMsg.lineWidth=1;
        //create gradient
        gradientPlayAgain.addColorStop("0.82","red");
        gradientPlayAgain.addColorStop("0.7","yellow");
        gradientPlayAgain.addColorStop("0.6","green");
        gradientPlayAgain.addColorStop("0.4","blue");
        gradientPlayAgain.addColorStop("0.2","indigo");
        gradientPlayAgain.addColorStop("0","violet");

        // fill with gradient
        playAgainMsg.fillStyle=gradientPlayAgain;
        //playAgainMsg.lineWidth=1;
        playAgainMsg.fillText("Press ENTER to play again! :)",170,460);        
}

// como era antes a msg de restart with enter:
//         playAgainMsg.font = '40px San serif';
//         playAgainMsg.strokeStyle="rgb(0, 0, 255)";
//         playAgainMsg.lineWidth=1;
//         playAgainMsg.strokeText("Press ENTER to play again",300,560);

// score
var drawScoreOnCanvas = game.canvas.getContext('2d'); 

function drawScore() {
        drawScoreOnCanvas.font = "bold 16px Arial";
        drawScoreOnCanvas.fillStyle = "white";
        drawScoreOnCanvas.fillText("Score: "+score, 20, 20);
}

// restart when game over
function restartGame() {
        location.reload();  // reload page
        //ctx.clearRect(0, 0, 800, 600); //nao funfou
        // game.gameOver = 0; 
        // execGameLoop();
        }      
      
// setInterval(drawSnake, 10); //execute draw function every 10 miliseconds - instead setinterval, I could also apply requestAnimationFrame().
function execGameLoop() {
        ctx.clearRect(0, 0, 800, 600);
        drawBorders();
        drawScore();
        collisionDetector();
        if (game.gameOver === 0) {
                moveSnake();
                if(game.apples.length < 3) {
                        createNewApple();
                }
                var myTimeOut = setTimeout(execGameLoop, game.frameRate);
        } else {
                clearTimeout(myTimeOut);
        }
        drawApple();
        drawSnake();
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
                                        event.preventDefault(); //impede de rolar tela com tecla seta
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

document.addEventListener('keypress', function (e) {
        var keyEnter = e.keyCode;  //ou seria keyEnter? nome da var
        console.log(e);

        if (keyEnter === 13) {
                restartGame();
        }
});