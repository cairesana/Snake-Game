//creating boardgame using canvas
var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d"); // getContext() is a built-in html object, with properties and methods for drawing. ctx var will store the 2D rendering context (the actual tool we can use to paint on the Canvas).
        
//drawing the ball in canvas
var randomX = Math.floor(Math.random() * Math.floor(100));
var randomY = Math.floor(Math.random() * Math.floor(100));
        
ctx.beginPath();    //beginPath and closePath methods.. 
ctx.arc(randomX, randomY, 5, 0, Math.PI*2, false); // arc method takes 6 parameters: x and y: coordinates of the arc's center; - arc radius 
                                                    // - start angle and end angle (to start and finish drawing the circle, in radians)
                                                    // - direction of drawing (false: clockwise, the default, or true: anti-clockwise.) This is optional
ctx.fillStyle = "rgba(0, 255, 0, 1)"; //fillStyle property stores a color that will be used by the fill() method 
ctx.fill(); //this method paints the ball
ctx.strokeStyle = "rgba(0, 120, 0, 1)"; //rgba - red green blue alpha (a= opacity)
ctx.stroke(); //stroke faz borda, sem preencher dentro
ctx.closePath();
        

        


