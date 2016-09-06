console.log("It works :D");

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var COUNTERMULTIPLIER = 0.05;

var counter = 0;
var distance = 125;
var randomBoxPos;
var enteredSectorTwo;
var enteredSectorFour;
var playerX, playerY;
var distanceFromObstacle;
var isRunning = true;
var score = 0;
var obstacleSize;
var keys = [];

canvas.width = 500;
canvas.height = 500;

ctx.translate(250, 250);

update();

function update() {
  if (keys[37]) {
    if (Math.abs(distance > 70)) {
      distance = distance - (25 * COUNTERMULTIPLIER);
    }
  } else if (keys[39]) {
    if (Math.abs(distance < 225)) {
      distance = distance + (25 * COUNTERMULTIPLIER);
    }
  }

  playerX = (Math.sin(counter) * distance);
  playerY = (Math.cos(counter) * distance);

  ctx.clearRect(-250, -250, 500, 500);

  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(playerX, playerY, 25, 0, 2 * Math.PI);
  ctx.fill();

  if (Math.sin(counter) <= -0.5 && Math.cos(counter) >= 0) {
    if (enteredSectorTwo !== true) {
      randomBoxPos = Math.round((Math.random() * -175) - 50);
      obstacleSize = Math.round(Math.random() * 25) + 10;
      score++;
    }
    enteredSectorTwo = true;
  }

  if (Math.sin(counter) > 0 && Math.cos(counter) > 0) {
    enteredSectorTwo = false;
  }

  ctx.beginPath();
  ctx.arc(0, randomBoxPos, obstacleSize, 0, 2 * Math.PI);
  ctx.fill();

  distanceFromObstacle = Math.sqrt(Math.pow(playerX - 0, 2) + Math.pow(playerY - randomBoxPos, 2));

  if (distanceFromObstacle < 25 + obstacleSize) {
    isRunning = false;
    deathMessage();
  } else {
    counter += COUNTERMULTIPLIER;
    requestAnimationFrame(update);
  }
}

function deathMessage() {
  ctx.clearRect(-250, -250, 500, 500);

  ctx.font = "48px impact";
  ctx.textBaseline = "middle";
  ctx.fillText("You Dun Died", 0 - (ctx.measureText("You Dun Died").width / 2), -125);

  ctx.fillText(score, 0 - (ctx.measureText(score).width / 2), 0);

  ctx.font = "24px monospace";
  ctx.fillText("Press Space to try again", 0 - (ctx.measureText("Press Space to try again").width / 2), 100);
}

function reset() {
  counter = 0;
  randomBoxPos = Math.round((Math.random() * -175) - 50);
  isRunning = true;
  distance = 125;
  score = 0;
  update();
}

window.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
  case " ":
    if (!isRunning) {
      reset();
    }
    break;
  default:
    console.log("Unknown key: " + event.key);
    return;
  }


  event.preventDefault();
}, true);


window.addEventListener("keydown", function (event) {
  keys[event.keyCode] = true;
}, true);

window.addEventListener("keyup", function (event) {
  delete keys[event.keyCode];
}, true);
