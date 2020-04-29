const TOTAL = 1000;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let generation = 1;
let alive = TOTAL;
let score = 0;
let bestScore = 0;
let scrollSpeed = 1;
let x1 = 0;
let x2;

let birdImg, pipeImg, pipeRevImg, backgroundImg, backgroundImage1, backgroundImage2;

function preload() {
  birdImg = loadImage('graphics/bird.png');
  pipeImg = loadImage('graphics/pipes.png');
  pipeRevImg = loadImage('graphics/pipes_reverse.png');
  backgroundImg = loadImage('graphics/background.png');
}

function keyPressed() {
  if (key === 'S') {
    let bird = birds[0];
    saveJSON(bird.brain, 'bird.json');
  }
}

function setup() {
  createCanvas(400, 600);
  slider = createSlider(1, 10, 1);
  slider.position(225, 180);
  x2 = width;

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
          alive = birds.length;
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      alive = TOTAL;
      if (score > bestScore) {
        bestScore = score;
      }
      score = 0;
      generation++;
      pipes = [];
    }

    //moving background image
    backgroundImage1 = image(backgroundImg, x1, 0, width, height);
    backgroundImage2 = image(backgroundImg, x2, 0, width, height);
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;

    if (x1 < -width){
      x1 = width;
    }
    if (x2 < -width){
      x2 = width;
    }
  }

  // All the drawing stuff
  //background(backgroundImage);

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }

  setStats();
}

function setStats() {
	document.getElementById('generation').value = generation;
  document.getElementById('alive').value = alive;
	document.getElementById('score').value = score;
  document.getElementById('bestscore').value = bestScore;
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
