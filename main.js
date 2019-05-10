var game = {};

game.canvas = document.getElementById("myCanvas");
game.frameRate = 90; // game veloc. - update screen (miliseconds)
game.snake = {
                direction: 'south',
                bodyPartSize: 12, 
                body: [
                        {x:400, y:80},     // create two balls = snake's head
                        {x:400, y:68}
                ]
        };

game.apples = [];
game.gameOver = 0; 

var score = 0;
var playersName = window.prompt("Player's name -- maximum of 12 characters: ");
while (playersName.length > 12) {
        playersName = window.prompt("Please, try again with a maximum of 12 characters: ");
        continue;
}


// create boardgame using canvas
// getContext(): built-in html obj with properties and methods for drawing. 
// ctx var will store the 2D rendering context (the actual tool we can use to paint on the Canvas).
var ctx = game.canvas.getContext("2d"); 


// borders
var canvasBorder = game.canvas.getContext("2d");

function drawBorders() {
        canvasBorder.beginPath();
        canvasBorder.lineWidth=10;
        canvasBorder.strokeStyle="red";
        canvasBorder.rect(5, 40, 790, 555); //(x, y, width, height);
        canvasBorder.stroke();
        canvasBorder.closePath();
};


// create green apple 
function createNewApple() { 
        //maxRandomX = 780
        //minRandomX = 10
        //maxRandomY = 585
        //minRandomY = 50
        // TO DO: test this option: var randomX = Math.floor(Math.random() * (max - min + 1)) + min; pra range entre numeros
        var randomX = Math.floor(Math.random() * Math.floor(800)); // (myCanvas 800 x 600) 10 e 780
        var randomY = Math.floor(Math.random() * Math.floor(600)); // 50 e 585
        
        if (randomX >= 10 && randomX <= 780 && randomY >= 50 && randomY <= 585) {
                game.apples.push({x: randomX, y: randomY});  //saves apple in apple's []      
        } else {
                createNewApple() 
        }
}

// draw green apple
var canvasApple = game.canvas.getContext("2d");
function drawApple() {
        game.apples.forEach(function(element) {
                canvasApple.beginPath();     
                canvasApple.arc(element.x, element.y, 3, 0, Math.PI*2, true); // x, y: coordinates of arc's center (radious); start angle; end angle (start and finish drawing in radians); PI: ratio of the circumference of a circle; true: anti-clockwise (drawing's direction) 
                canvasApple.fillStyle = "rgba(0, 255, 0, 1)"; // fillStyle property stores a color  
                canvasApple.fill(); // paints the circle using the color stored in fillstyle
                canvasApple.strokeStyle = "rgba(0, 0, 0, 0)"; 
                canvasApple.stroke(); 
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
                        initialSnake.fillStyle = 'rgb(255, 255, 255)';
                        initialSnake.fill();
                        initialSnake.closePath();
                });
}

function moveSnake() {
        var newX; 
        var newY;

        switch (game.snake.direction) {
                case 'north': // cima: decrementa y; permanece x igual
                        newX = game.snake.body[0].x;  
                        newY = game.snake.body[0].y - game.snake.bodyPartSize;
                        break;
                case 'east': // direita: incrementa x; permanece y igual
                        newX = game.snake.body[0].x + game.snake.bodyPartSize;
                        newY = game.snake.body[0].y;
                        break;
                case 'south': // baixo: incrementa y; permanece x igual
                        newX = game.snake.body[0].x;
                        newY = game.snake.body[0].y + game.snake.bodyPartSize;
                        break;
                case 'west': // esquerda: decrementa o x; permanece y igual
                        newX = game.snake.body[0].x - game.snake.bodyPartSize;
                        newY = game.snake.body[0].y;
                        break;
        }

                game.snake.body.pop();
                game.snake.body.unshift({x: newX, y: newY});
                //console.log(game.snake.body);
        
}


// collision detector 
// TO DO: collision also for: snake hits its own body  
function collisionDetector() {
        // collision with apple
        game.apples.forEach(function(element, index, object) {
                if (
                    (element.x >= game.snake.body[0].x && (element.x + 1.5) <= (game.snake.body[0].x + game.snake.bodyPartSize)) 
                    && (element.y >= game.snake.body[0].y && (element.y + 1.5) <= (game.snake.body[0].y + game.snake.bodyPartSize))
                ) {
                        removeApple(index, object);
                        growSnake();
                        score++;
                }
        }); // to do: improve it - sometimes it doesn't "eats" the apple 
                

        // collision against borders - x.left(20); x.right(780); y.top(55); y.bottom(580)
        if (game.snake.body[0].x < 20 || game.snake.body[0].x > 780 || game.snake.body[0].y < 55 || game.snake.body[0].y > 580) { 
                console.log("GAME OVER");
                drawGameOverMessage();
                drawPlayAgainMessage();
                game.gameOver = 1; 
        }
}

// remove apple when collision is detected  
function removeApple(index, object) {
        object.splice(index, 1);
        // console.log(object, index);  
}

// grow snake     
function growSnake() {
        var snakeLastBodyPart = game.snake.body[game.snake.body.length - 1];
        var newBodyPartX;
        var newBodyPartY;
        //console.log(snakeLastBodyPart);
             
        game.snake.body.splice(game.snake.body.length, 0, {x: newBodyPartX, y: newBodyPartY});
        //console.log("grow snake", game.snake.body);
} 

// draw "game over" message (when collision against borders)
var gameOverMessage = game.canvas.getContext('2d');

function drawGameOverMessage() {
        gameOverMessage.font = '60px San serif';  
        canvasBorder.lineWidth=2;
        gameOverMessage.strokeStyle = 'rgba(27, 28, 28, 10)';  
        gameOverMessage.strokeText('Game Over', 280, 300);
      }

// Play again message
var playAgainMsg = game.canvas.getContext('2d');

var gradientPlayAgain = playAgainMsg.createLinearGradient(0,0,game.canvas.width,0);

function drawPlayAgainMessage() {
        playAgainMsg.font = '40px San serif';
        //create gradient
        gradientPlayAgain.addColorStop("0.82","red");
        gradientPlayAgain.addColorStop("0.7","yellow");
        gradientPlayAgain.addColorStop("0.6","green");
        gradientPlayAgain.addColorStop("0.4","blue");
        gradientPlayAgain.addColorStop("0.2","indigo");
        gradientPlayAgain.addColorStop("0","violet");

        // fill in with gradient
        playAgainMsg.fillStyle=gradientPlayAgain;
        playAgainMsg.fillText("Press ENTER to play again! :)",170,460);        
}

// score
var drawScoreOnCanvas = game.canvas.getContext('2d'); 

function drawScore() {
        drawScoreOnCanvas.font = "bold 18px Arial";
        drawScoreOnCanvas.fillStyle = "white";
        drawScoreOnCanvas.fillText("Score: "+score, 20, 20);
}

// players name
var drawPlayersNameOnCanvas = game.canvas.getContext('2d');
console.log('player: ', playersName) 

function drawPlayersName() {
        x = 20
        drawPlayersNameOnCanvas.font = "bold 18px Arial";
        drawPlayersNameOnCanvas.fillStyle = "Gray";
        drawPlayersNameOnCanvas.fillText("Player: "+playersName, 600, 20); 
        // TO DO: melhorar a localizao de acordo com tamanho de letras
}

// restart when game over
function restartGame() {
        location.reload();  // reload page
        }      
      
// setInterval(drawSnake, 10); //execute draw function every 10 miliseconds - instead setinterval, I could also apply requestAnimationFrame().
function execGameLoop() {
        ctx.clearRect(0, 0, 800, 600);
        drawBorders();
        drawScore();
        drawPlayersName(); 
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
                case 'south': // going down: somente possibilidade de virar para esq ou dir
                        switch (keyCode) {
                                case 37: // key: left
                                        game.snake.direction = 'west';
                                        event.preventDefault(); // previne uso da tecla setas de rolar a tela  
                                        break;
                
                                case 39: // key: right
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
                                case 38: // key: up
                                        game.snake.direction = 'north';
                                        event.preventDefault();
                                        break; 
                     
                                case 40: // key: down
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
        var keyEnter = e.keyCode;  
        console.log(e);

        if (keyEnter === 13) {
                restartGame();
        }
});