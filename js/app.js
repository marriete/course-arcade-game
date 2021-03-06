"use strict";

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 39;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Collision detection
    if(((this.x + this.width < (player.x + player.width) && this.x + this.width > (player.x - player.width)) ||
        (this.x - this.width < (player.x + player.width) && this.x - this.width > (player.x - player.width))) &&
        (((this.y + 8) == player.y))) {
        player.resetPosition();
    }
    // Reset enemy position and gain new speed
    if(this.x > 500) {
        this.x = -100;
        this.speed = 150 + Math.floor(Math.random() * 300);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables designated for the player class
    this.sprite = 'images/char-boy.png';
    this.width = 39;
    this.height = 33;
    this.x = x;
    this.y = y;
}

// Resets player position on collision or after reaching water
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
}

// Required function for game operation
Player.prototype.update = function() {
   if(this.y < 0) {
        this.resetPosition();
    }
}

// Required function for game operation that renders the player model on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Function for Player class that handles the corresponding arrow key press
Player.prototype.handleInput = function(keyPressed) {
    if(keyPressed == 'up') {
        this.y -= 83;
    } else if(keyPressed == 'down' && this.y < 400) {
        this.y += 83;
    } else if(keyPressed == 'left' && this.x > 0) {
        this.x -= 102;
    } else if(keyPressed == 'right' && this.x < 400) {
        this.x += 102;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 400);
let allEnemies = [];
let enemyYPositions = [60, 143, 226];

enemyYPositions.forEach(function(element) {
    let enemy = new Enemy(-100, element, 150 + Math.floor(Math.random() * 300));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});