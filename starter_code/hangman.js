var hangman;
var hangmanCanvas;

function Hangman() {
  this.words = [
    "ironman",
    "toto",
    "helloworld",
    "ironhack",
    "javascript",
    "cable",
    "hulk"
  ];
  this.secretWord = this.getWord();
  this.letters = [];
  this.guessedLetter = "";
  this.errorsLeft = 10;
}

function randomSelector(arrayOfWord) {
  var randomIdx = Math.floor(Math.random() * arrayOfWord.length);
  return arrayOfWord[randomIdx];
}
Hangman.prototype.getWord = function() {
  return randomSelector(this.words);
};

Hangman.prototype.checkIfLetter = function(keyCode) {
  if (keyCode >= 65 && keyCode < 91) {
    return true;
  }
  return false;
};

Hangman.prototype.checkClickedLetters = function(key) {
  debugger;
  var array = this.letters.filter(function(letter) {
    return letter === key;
  });
  if (this.letters.length > 0 && this.letters.includes(key)) {
    return false;
  }
  return true;
};

Hangman.prototype.addCorrectLetter = function(i) {
  this.guessedLetter += this.secretWord[i].toUpperCase();
};

Hangman.prototype.addWrongLetter = function(letter) {
  if (this.errorsLeft > 0 && !this.secretWord.includes(letter)) {
    this.errorsLeft--;
  }
};

Hangman.prototype.checkGameOver = function() {
  return this.errorsLeft > 0 ? false : true;
};

Hangman.prototype.checkWinner = function() {
  var nbLetters = 0;
  if (this.secretWord.length === this.guessedLetter.length) {
    for (var i = 0; i < this.guessedLetter.length; i++) {
      const elementGuess = this.guessedLetter[i];
      for (var j = 0; j < this.secretWord.length; j++) {
        const element = this.secretWord[j];
        if (element === elementGuess) {
          nbLetters++;
        }
      }
    }
    if (nbLetters === this.secretWord.length) {
      return true;
    }
  }
  return false;
};

document.getElementById("start-game-button").onclick = function() {
  hangman = new Hangman();

  hangman.letters.push(hangman.secretWord[0]);
  hangman.letters.push(hangman.secretWord[hangman.secretWord.length - 1]);
  hangman.guessedLetter += hangman.secretWord[0];
  hangman.guessedLetter += hangman.secretWord[hangman.secretWord.length - 1];
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
};

function alertPlayer(hangman) {
  if (hangman.checkWinner()) {
    alert("you win");
    return true;
  } else if (hangman.checkGameOver()) {
    alert("you lose");
    return true;
  }
  return false;
}

document.onkeydown = function(e) {
  if (alertPlayer(hangman)) return;

  if (hangman.checkIfLetter(e.keyCode)) {
    var pos = prompt("position ? ");
    hangman.letters.push(e.key);
    if (
      /*!hangman.checkClickedLetters(e.key) &*/
      hangman.secretWord.includes(e.key) &&
      hangman.secretWord[pos] === e.key
    ) {
      hangman.addCorrectLetter(pos);
      hangmanCanvas.writeCorrectLetter(pos);
    } else {
      hangman.addWrongLetter();
      if (hangman.errorsLeft >= 4) {
        hangmanCanvas.drawLines(hangman.errorsLeft);
      } else {
        hangmanCanvas.drawHangman(hangman.errorsLeft);
      }
    }

    if (alertPlayer(hangman)) return;
  }
};
