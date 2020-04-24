
class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.brain = new NeuralNetwork(4,4,1);
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  };

  up() {
    this.velocity += this.lift;
  };

  think(pipes)

    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;

    //let inputs = [1.0, 0.5, 0.2, 0.3];
    let output = this.brain.predict(inputs);
    if (ouput > 0.5) {
      this.up();
    }
  }

  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}
