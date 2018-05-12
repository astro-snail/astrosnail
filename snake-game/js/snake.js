var FIELD_SIZE_X = 32;
var FIELD_SIZE_Y = 32;
var SNAKE_SPEED = 300;
var FOOD_DELAY = 3000;
var OBSTACLE_DELAY = 15000;

var gameIsRunning = false;
var snake = [];
var snakeTimer;
var foodTimer;
var obstacleTimer;
var direction;
var score;

// Directions with keycodes
var directions = {
    left: {
        keycode: 37
    },
    up: {
        keycode: 38
    },
    right: {
        keycode: 39
    },
    down: {
        keycode: 40
    }
};

// Initialize
function init() {
    prepareGameField();
    document.getElementById("control-game").addEventListener("click", controlGame);
    addEventListener("keydown", changeDirection);
}

// Draw game board and control button
function prepareGameField() {
    
    var gameTable = document.createElement("table");
    gameTable.setAttribute("class", "game-table");

    for (var i = 0; i < FIELD_SIZE_X; i++) {
        var row = document.createElement("tr");
        row.setAttribute("class", "game-table-row row-" + i);

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("class", "game-table-cell cell-" + i + "-" + j);
            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
    document.getElementById("snake-field").appendChild(gameTable);
    
    toggleButton();
}

// Start or stop the game
function controlGame() {
    if (gameIsRunning) {
        finishGame();
    } else {    
        clearField();
        startGame();
    }
}

// Start game
function startGame() {
    gameIsRunning = true;
    direction = directions.up; // Initial direction
    score = 0;
    setScore();
    renderSnake();
    snakeTimer = setInterval(snakeMove, SNAKE_SPEED);
    foodTimer = setTimeout(createFood, FOOD_DELAY);
    obstacleTimer = setTimeout(createObstacle, Math.random() * OBSTACLE_DELAY);
    
    toggleButton();
}

// Toggle button caption
function toggleButton() {
    var caption;
    
    if (gameIsRunning) {
        caption = "Finish Game";
    } else {
        caption = "Start Game";
    }

    document.getElementById("control-game").innerHTML = caption;    
}

// Clear snake, food and obstacle classes
function clearField() {
    while (snake.length) {
        snake.pop().classList.remove("snake-unit");
    }
    
    clear("food-unit");
    clear("obstacle-unit");
}

// Clear class <className>
function clear(className) {
    var list = document.getElementsByClassName(className);
    
    while(list.length) {
        list[0].classList.remove(className);
    }    
}

// Create a randomly sized obstacle on the field
function createObstacle() {
    
    var created = false;
    
    while (!created) {
        var x = Math.floor(Math.random() * FIELD_SIZE_X);
        var y = Math.floor(Math.random() * FIELD_SIZE_Y);
        var dx = Math.floor(Math.random() * FIELD_SIZE_X / 5);
        var dy = Math.floor(Math.random() * FIELD_SIZE_Y / 5);
        
        for (var i = x; i < x + dx; i++) {
            for(var j = y; j < y + dy; j++) {
                var newUnit = document.getElementsByClassName("cell-" + i + "-" + j)[0]; 
                if (newUnit == undefined || !isEmpty(newUnit)) {
                    break;
                }
                newUnit.classList.add("obstacle-unit");
                created = true; // at least one cell is created
            }
        }
    }
    obstacleTimer = setTimeout(createObstacle, Math.random() * OBSTACLE_DELAY);
}

// Draw an initial snake
function renderSnake() {
    var startCoordX = Math.floor(FIELD_SIZE_X / 2);
    var startCoordY = Math.floor(FIELD_SIZE_Y / 2);

    var snakeHead = document.getElementsByClassName("cell-" + startCoordX + "-" + startCoordY)[0];
    snakeHead.setAttribute("class", snakeHead.getAttribute("class") + " snake-unit");
    
    var snakeTail = document.getElementsByClassName("cell-"+ (startCoordX + 1) + "-" + startCoordY)[0];
    snakeTail.setAttribute("class", snakeTail.getAttribute("class") + " snake-unit");
    
    snake.push(snakeTail);
    snake.push(snakeHead);
}

// Perform one move
function snakeMove() {
    var snakeHeadClasses = snake[snake.length - 1].getAttribute("class").split(" ");
    
    var snakeCoords = snakeHeadClasses.find(function(element) {
        return (element.match(/^cell-(\d+)-(\d+)/));
    }).split("-");

    snakeCoords.shift();
    
    var x = parseInt(snakeCoords[0]);
    var y = parseInt(snakeCoords[1]);
    
    switch (direction) {
        case directions.up:
            x--;
            if (x < 0) {
                x = FIELD_SIZE_X - 1;
            }
            break;
        case directions.down:
            x++;
            if (x > FIELD_SIZE_X - 1) {
                x = 0;
            }
            break;
        case directions.left:
            y--;
            if (y < 0) {
                y = FIELD_SIZE_Y - 1;
            }
            break;
        case directions.right:
            y++;
            if (y > FIELD_SIZE_Y - 1) {
                y = 0;
            }
            break;
    }
    
    var newUnit = document.getElementsByClassName("cell-" + x + "-" + y)[0];
    
    if (isSnake(newUnit) || isObstacle(newUnit)) {
        finishGame();
    } else if (isFood(newUnit)) {
        eat(newUnit);
    } else {
        move(newUnit);
    }
}

// Check if this cell occupied by the snake
function isSnake(newUnit) {
    return snake.includes(newUnit);
}

// Check if this cell contains an obstacle
function isObstacle(newUnit) {
    return newUnit.getAttribute("class").split(" ").includes("obstacle-unit");
}

// Check if this cell contains food
function isFood(newUnit) {
    return newUnit.getAttribute("class").split(" ").includes("food-unit");
}

// Check if this cell is empty
function isEmpty(newUnit) {
    return (!isFood(newUnit) && !isObstacle(newUnit) && !isSnake(newUnit));
}

// Update the score
function setScore() {
    document.getElementById("score").innerHTML = "Your Score: " + score;
}

// Eat food
function eat(newUnit) {
    newUnit.classList.remove("food-unit");
    newUnit.classList.add("snake-unit");
    snake.push(newUnit);
    
    score++;
    setScore();
    
    foodTimer = setTimeout(createFood, FOOD_DELAY);
}

// Move snake
function move(newUnit) {
    newUnit.classList.add("snake-unit");
    snake.push(newUnit);
    snake.shift().classList.remove("snake-unit");
}

// Create randomly positioned food
function createFood() {
    var foodCreated = false;
    
    while (!foodCreated) {
        var x = Math.floor(Math.random() * FIELD_SIZE_X);
        var y = Math.floor(Math.random() * FIELD_SIZE_Y);
        
        var newUnit = document.getElementsByClassName("cell-" + x + "-" + y)[0];
        
        if (newUnit != undefined && isEmpty(newUnit)) {
            newUnit.classList.add("food-unit");
            foodCreated = true;
        }
    }
}

// Change direction - only 90 degree turns allowed
function changeDirection(e) {
    switch (e.keyCode) {
        case directions.left.keycode:
            if (direction == directions.up || direction == directions.down) {
                direction = directions.left;
            }
            break;
        case directions.up.keycode:
            if (direction == directions.left || direction == directions.right) {
                direction = directions.up;
            }
            break;
        case directions.right.keycode:
            if (direction == directions.up || direction == directions.down) {
                direction = directions.right;
            }
            break;
        case directions.down.keycode:
            if (direction == directions.left || direction == directions.right) {
                direction = directions.down;
            }
            break;
    }
}

// Finish game
function finishGame() {
    gameIsRunning = false;
    clearInterval(snakeTimer);
    clearTimeout(foodTimer);
    clearTimeout(obstacleTimer);
    alert("The game is over! Thank you for playing!");
    
    toggleButton();
}

window.onload = init;