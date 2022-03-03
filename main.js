//colors appear at random after you click Start
//one highlighted button cannot be hightlighted twice in a row
//four circles (each has it's own color ideally)
//the player should click the circle before the circle changes
//when you have game over a modal window appears that says the score and game over
//
//when the game just starts the first round lets you skip first clicks ?
//the speed of the game increases
//circles are not clickable before the game starts
//
//next level: you have only Start game button. After it's clicked it's changed to Stop game button. - Hide one button with JS basically
//
//after game starts it let's you make 3 misclicks
// add sounds on start and end game
// change message of modal depending on the score
//
//other versions: circles lit up and you have to repeat the pattern before timer runs out;
//you have to repeat the patter and the game is waiting, patterns are getting longer each time.
//
//advanced: player can enter their name and the end result will be saved in JSON format
//top 10 scores are shown at the end of the game
//game gets faster with each level or number of circles increases

//Queries
const btnStart = document.querySelector('#btn-start');
const btnStop = document.querySelector('#btn-stop');
const btnClose = document.querySelector('#btn-close');
const gameOverMsg = document.querySelector('.container-gameover');
const circles = document.querySelectorAll('.circles');
const scoreText = document.querySelectorAll('.scoreText');

let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
let currentActive = 0;

btnStart.addEventListener('click', () => {
  //start game
  console.log('Button Start is clicked');
  gameStart();
});

btnStop.addEventListener('click', () => {
  //make Game Over message appear on Stop button click
  gameOverMsg.style.visibility = 'visible';
  console.log('Button Stop is clicked');
});

btnClose.addEventListener('click', () => {
  //set visibility to hidden
  console.log('Button Close is clicked');
  gameOverMsg.style.visibility = 'hidden';
  //Reload page to erase score
  window.location.reload();
  //Alternative set score to 0
});

//Add event on click for each circle
circles.forEach((circle, i) => {
  circle.addEventListener('click', () => circleOnClick(i));
});

//Circle on click removes the .active class to set background of a circle
const circleOnClick = (i) => {
  if (i != currentActive) endGame();
  else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
  console.log(`Circle ${i} is clicked`);
  //   active = i;
  //   circles[i].classList.toggle('active');
};

//Generate a random number that is not equal to the last number
const getRandom = (lastNumber) => {
  let random = Math.floor(Math.random() * 4);
  while (random === lastNumber) {
    random = Math.floor(Math.random() * 4);
  }
  return random;
};

//GAMEPLAY
const gameStart = () => {
  console.log('Game started');
  //Make all circles clickable
  circles.forEach((circle) => (circle.style.pointerEvents = 'auto'));
  //Switch button Start to Stop
  btnStart.style.display = 'none';
  btnStop.style.display = 'inline-block';

  //ACTUAL GAME
  //Pick a new circle that is not the same as the current one
  let newActive = getRandom(currentActive);
  circles[newActive].classList.toggle('active');

  //Make background of old active circle white
  circles[currentActive].classList.remove('active');

  //Set newActive to be currentActive
  currentActive = newActive;
  console.log('Circle number ' + currentActive + ' is selected');

  //
  timer = setTimeout(() => gameStart(), pace);
  //Increasing pace of a game each round
  pace = pace - 10;
  rounds++;
  //Give player a chance to miss 4 times
  if (rounds >= 5) {
    endGame();
  }
  //Log score on a sceen and modale
  scoreText.forEach((text) => {
    text.textContent = score;
  });
  console.log(score);
};

//GAME end
const endGame = () => {
  clearTimeout(timer);
  gameOverMsg.style.visibility = 'visible';
};
