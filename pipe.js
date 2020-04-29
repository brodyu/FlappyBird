class Pipe {
  constructor() {
    this.spacing = 250;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 5;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    score++;
    return false;
  }

  show() {
    fill(255);
    image(pipeRevImg, this.x, 0, this.w, this.top);

    fill(0, 255, 0);
    let height_b = height - this.spacing - this.top;
    let y_b = height - height_b;
    image(pipeImg, this.x, y_b, this.w, height_b);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
