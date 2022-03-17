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
const audio = document.querySelector('#btn-audio');
const audioOn = document.querySelector('.fa-volume-high');
const audioOff = document.querySelector('.fa-volume-xmark');

let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
let currentActive = 0;

//Sound
class Sound {
  constructor(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function () {
      this.sound.play();
    };
    this.stop = function () {
      this.sound.pause();
    };
  }
}

const sound = new Sound('/frog.ogg');
audioOn.style.display = 'block';
audioOff.style.display = 'none';

//Turn off audio on click
audio.addEventListener('click', () => {
  if (audioOn.style.display === 'none') {
    console.log('Sound on');
    audioOn.style.display = 'block';
    audioOff.style.display = 'none';
  } else {
    console.log('Sound off');
    audioOn.style.display = 'none';
    audioOff.style.display = 'block';
  }
});

btnStart.addEventListener('click', () => {
  //start game
  console.log('Button Start is clicked');
  startGame();
});

btnStop.addEventListener('click', () => {
  //make Game Over message appear on Stop button click
  console.log('Button Stop is clicked');
  endGame();
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
  console.log(`Circle ${i + 1} is clicked`);
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
const startGame = () => {
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
  //If not muted play sound
  if (audioOn.style.display === 'block') {
    sound.play();
  }

  //Make background of old active circle white
  circles[currentActive].classList.remove('active');

  //Set newActive to be currentActive
  currentActive = newActive;
  console.log('Circle number ' + (currentActive + 1) + ' is selected');

  //
  timer = setTimeout(() => startGame(), pace);
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
