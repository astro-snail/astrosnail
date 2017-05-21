var t1 = 0;
var t2 = 0;
var bestResult = 0;
var container = document.getElementById("container");
var shape = document.getElementById("shape");

// Return a random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
    return min + Math.random() * (max - min);
}
            
// Return a random colour code
function getRandomColour() {
    var hex = "0123456789ABCDEF";
    var colourCode = "#";

    for (var i = 0; i < 6; i++) {
        colourCode += hex.charAt(Math.floor(getRandomNumber(0, 16)));    
    }

    return colourCode;
}

// Set the height of a container
/*function setContainerHeight() {
    var border = container.offsetHeight - container.clientHeight;  
    container.style.height = (document.body.offsetHeight - document.getElementById("header").offsetHeight - border) + "px";      
}*/

// Style and show the shape
function showShape() {
    var minDimension = Math.min(container.clientWidth, container.clientHeight);
    var size = getRandomNumber(minDimension / 8, minDimension / 2);
    var posLeft = getRandomNumber(0, container.clientWidth - size);
    var posTop = getRandomNumber(0, container.clientHeight - size);

    shape.style.width = size  + "px";
    shape.style.height = size  + "px";
    shape.style.top = posTop + "px";
    shape.style.left = posLeft + "px";
    shape.style.backgroundColor = getRandomColour();

    if (Math.random() < 0.5) {
        shape.style.borderRadius = "50%";
    } else {
        shape.style.borderRadius = "0%";
    }

    shape.style.display = "block";
    t1 = getTime();
}

// Show the shape with a random timeout of up to 2000 ms
function showShapeTimed() {
    setTimeout(showShape, getRandomNumber(0, 2000));
}

// Hide the shape
function hideShape() {
    shape.style.display = "none";
}

// Show the time
function updateTimer(t1, t2) {
    var result = (t2 - t1)/1000;
        
    document.getElementById("timer").innerHTML = result + "s";
    
    if (bestResult == 0 || result < bestResult) {
        bestResult = result;
        document.getElementById("bestResult").innerHTML = bestResult + "s";
    }
}

// Return current time in milliseconds
function getTime() {
    return new Date().getTime();
}

// Event handler for shape.onclick event
function onShapeClicked() {
    t2 = getTime();
    hideShape();
    updateTimer(t1, t2);

    showShapeTimed();
}

shape.addEventListener("click", onShapeClicked);

//setContainerHeight();

showShapeTimed();