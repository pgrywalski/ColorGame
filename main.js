var colorDisplay = document.getElementById("color-display");
var messageDisplay = document.getElementById("message");
var scoreDisplay = document.getElementById("score-span");
var squares = document.querySelectorAll(".square");
var btnMode = document.querySelectorAll(".mode");
var btnReset = document.getElementById("reset");
var h1 = document.querySelector("h1");

var numSquares = 3;
var score = 0;
var scoreIteration = 0;
var colors = [];
var pickedColor;

init();

// Initialize function
function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

// Setup listener od Reset button
btnReset.addEventListener("click", function() {
	reset();
});

// Setup Event listener on Mode Buttons
function setupModeButtons() {
	for ( var i = 0; i < btnMode.length; i++ ) {
		btnMode[i].addEventListener("click", function() {
			// Remove and set selected button class
			btnMode[0].classList.remove("selected");
			btnMode[1].classList.remove("selected");
			btnMode[2].classList.remove("selected");
			this.classList.add("selected");

			// Setup quantity of squares
			if ( this.textContent === "Easy" ) {
				numSquares = 3;
			} else if ( this.textContent === "Medium" ) {
				numSquares = 6;
			} else {
				numSquares = 9;
			}
			reset();
		});
	}
}

// Setup square listeners
function setupSquares() {
	for ( var i = 0; i < squares.length; i++ ) {
		// Click listener to squares
		squares[i].addEventListener("click", function() {
			scoreIteration++;
			// Grab color from clicked square
			var clickedColor = this.style.backgroundColor;
			// Compare color to picked
			if ( clickedColor === pickedColor ) {
				messageDisplay.textContent = "Correct!";
				h1.style.backgroundColor = clickedColor;
				changeColors( clickedColor );
				btnReset.textContent = "Play Again?";
				// Update score information
				if ( scoreIteration === 1 ) {
					score++;
					scoreDisplay.textContent = score;
				}
			} else {
				this.style.backgroundColor = "#FFFFF7";
				messageDisplay.textContent = "Try again!";
			}
		});
	}
}

// Reset colors and text
function reset() {
	// Reset score iteration
	scoreIteration = 0;
	// Generate all new colors
	colors = generateRandomColors( numSquares );
	// Pick new random color from array
	pickedColor = pickColor();
	// Update displayed color to match picked color and informations
	messageDisplay.textContent = "Let's Try!";
	colorDisplay.textContent = pickedColor;
	// Return background color to default
	h1.style.backgroundColor = "#FFFFF7";
	// Change text on button
	btnReset.textContent = "New Colors";
	// Change colors of all squares
	for ( var i = 0; i < squares.length; i++ ) {
		if ( colors[i] ) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

// Change colors of all squares to picked one
function changeColors( color ) {
	// Loop throught all squares
	for ( i = 0; i < squares.length; i++ ) {
		// Change each color to mach given color;
		squares[i].style.background = color;
	}
}

// Get random color from array
function pickColor() {
	return colors[( Math.random() * colors.length ) | 0];
}

// Create array of random colors
function generateRandomColors( num ) {
	// Create array of colors
	var colorsArr = [];
	// Add num of random colors to array
	for ( var i = 0; i < num; i++ ) {
		colorsArr.push( randomColor() );
	}
	return colorsArr;
}

// Generate string with random colors
function randomColor() {
	// Pick r g b colors from 0 - 255
	var r = Math.floor( Math.random() * 256 );
	var g = Math.floor( Math.random() * 256 );
	var b = Math.floor( Math.random() * 256 );
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
