function HangmanCanvas(secretWord) {
  this.canvas = document.getElementById("hangman");
  this.ctx = this.canvas.getContext("2d");
  this.secretWord = secretWord;
}
var arrayXwords = [];

HangmanCanvas.prototype.createBoard = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.font = "30px Arial";
  this.ctx.fillText(this.secretWord[0], 325, 780);
  arrayXwords.push(325);

  //secret word
  var startX = 300;
  for (let index = 0; index < this.secretWord.length; index++) {
    this.ctx.beginPath();
    startX = startX + 25;
    this.ctx.moveTo(startX, 800);
    startX = startX + 25;
    this.ctx.lineTo(startX, 800);
    this.ctx.stroke();
    arrayXwords.push(startX + 20);
  }
  startX = startX - 20;
  arrayXwords.push(startX);
  this.ctx.fillText(this.secretWord[this.secretWord.length - 1], startX, 780);
};

HangmanCanvas.prototype.drawLines = function(err) {
  if (err === 9) {
    this.ctx.beginPath();
    //triangle
    this.ctx.moveTo(200, 720);
    this.ctx.lineTo(100, 800);
  }
  if (err === 8) {
    this.ctx.lineTo(300, 800);
  }
  if (err === 7) {
    this.ctx.closePath();
  }
  if (err === 6) {
    this.ctx.moveTo(200, 720);
    //line 1
    this.ctx.lineTo(200, 100);
  }

  if (err === 5) {
    //line 2
    this.ctx.lineTo(600, 100);
  }

  if (err === 4) {
    //line 3
    this.ctx.lineTo(600, 150);
  }

  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "#666666";
  this.ctx.stroke();
};

HangmanCanvas.prototype.writeCorrectLetter = function(index) {
  this.ctx.fillText(this.secretWord[index], arrayXwords[index], 780);
};

HangmanCanvas.prototype.writeWrongLetter = function(letter, errorsLeft) {};

HangmanCanvas.prototype.drawHangman = function(err) {
  if (err === 3) {
    this.ctx.beginPath();
    var x = 600; // x coordinate
    var y = 200; // y coordinate
    var radius = 50; // Arc radius
    var startAngle = 300; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle
    this.ctx.arc(x, y, radius, startAngle, endAngle, true);
    this.ctx.stroke();
  }

  if (err === 2) {
    this.ctx.moveTo(600, 250);
    this.ctx.lineTo(600, 500);
    this.ctx.stroke();
  }
  if (err === 1) {
    this.ctx.lineTo(550, 600);
    this.ctx.stroke();
  }
  if (err === 0) {
    this.ctx.moveTo(600, 500);
    this.ctx.lineTo(650, 600);
    this.ctx.stroke();
    this.ctx.closePath();
  }
};

HangmanCanvas.prototype.gameOver = function() {};

HangmanCanvas.prototype.winner = function() {};
