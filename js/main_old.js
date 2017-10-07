// word list array
var wordList = [
	"cat",
	"bats",
	"horse",
	"snake",
	"alligator",
	"fish",
	"cougar",
	"eagle",
	];
var gameWord = '';
var guess = [];
var maxlives = 9;

// for loop to pick a random word
function newWord() {
    gameWord = wordList[Math.floor(Math.random() * wordList.length)];
}


// Scoreboard function
function setScore(score) {
    $('#scoreboard_img').addClass("image" + score);
}

function drawWord() {
	while (gameWord == '') {
		newWord();
	}
	$('#gameWord').html(gameWord);
}

function drawGuess() {
	$('#previousGuesses').text(guess.join(', '));
}

//verifies the guess is unique
function cleanGuess() {
    var uniqueGuess = [];
    $.each(guess, function(index, element) {
        if (element.length > 0 && $.inArray(element, uniqueGuess) == -1) {
            uniqueGuess.push(element);
        }
    });
    guess = uniqueGuess;
}

// user guessing here
function addGuess() {
    if (/^[a-zA-Z]*$/.test($('#guess').val()) && typeof $('#guess').val() !== "undefined") {
        guess.push($('#guess').val().toLowerCase());
    }

    $('#guess').val('');
}

function endGameDialog(isWinner) {
    if (isWinner) {
        $('#endGameDialogTitle').html('You won');
        $('#endGameDialogContent').html('You guessed ' + gameWord + ' in ' + guesses.length + ' attempts');
    } else {
        $('#endGameDialogTitle').html('You lost');
        $('#endGameDialogContent').html('Unlucky.  The word was ' + gameWord);
    }

    $('#endGameDialog').modal('toggle');
}

// check lives left
function reviewLives() {
    var livesRemaining = maxLives,
            string = gameWord.toLowerCase();

    for (var i = 0; i < guess.length; i++) {
        if (string.indexOf(guess[i], 0) == -1) {
            livesRemaining--;
        }
    }

    if (livesRemaining <= 0) {
        setScore(0);
        endGameDialog(false);
        return;
    }

    setScore(maxLives - livesRemaining);
}

// automate some functions

function resetGame() {
	setScore(0);
	gameWord = '';
	guess = [];
	newWord();
}

function update() {
    addGuess();
    cleanGuess();
    drawWord();
    drawGuess();
    reviewLives();
    checkIfWon();
}

$(document).ready(function() {
    drawWord();
    drawGuess();
    $('#guess').attr('onkeyup', 'update();');
});


