const TWO_PI = Math.PI * 2;
const NODE_SPEED = 2;
const NODE_RADIUS = 2;

let canvas, ctx;
let nodes = [];

window.onload = () => {
  canvas = document.getElementById('main-canvas');
  ctx = canvas.getContext('2d');

  window.addEventListener('resize', setup, false);

  setup();
  update();
};

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  nodes = [];
  for(let i = 0; i < 100; i++) {
    nodes.push(new Node());
  }
}

function update() {
  // update
  for(let i = 0; i < nodes.length; i++) {
    nodes[i].update();
  }

  // draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  for(let i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }

  requestAnimationFrame(update);
}

class Node {
  constructor(x, y) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    const direction = Math.random() * TWO_PI;
    this.xAcc = Math.cos(direction) * NODE_SPEED;
    this.yAcc = Math.sin(direction) * NODE_SPEED;
  }
  update = () => {
    const nextX = this.x + this.xAcc;
    const nextY = this.y + this.yAcc;
    if(nextX < 0 || nextX > canvas.width) {
      this.xAcc *= -1;
    }
    if(nextY < 0 || nextY > canvas.height) {
      this.yAcc *= -1;
    }

    this.x += this.xAcc;
    this.y += this.yAcc;
  }
  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, NODE_RADIUS, 0, TWO_PI);
    ctx.fill();
  }
}