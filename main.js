const TWO_PI = Math.PI * 2;
const NODE_SPEED = 2;
const NODE_RADIUS = 2;
const NODE_DISTANCE = 128;

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
  for(let i = 0; i < 300; i++) {
    nodes.push(new Node());
  }
}

function update() {
  // update
  for(let i = 0; i < nodes.length; i++) {
    nodes[i].update();
  }

  // sort nodes by y position
  nodes.sort((a, b) => a.y - b.y);

  // draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ddd';
  ctx.strokeStyle = '#ddd';
  for(let i = 0; i < nodes.length; i++) {
    nodes[i].draw();

    for(let j = i + 1; j < nodes.length; j++) {
      const yDiff = Math.abs(nodes[i].y - nodes[j].y);
      if(yDiff < NODE_DISTANCE) {
        const a = nodes[j].x - nodes[i].x;
        const b = nodes[j].y - nodes[i].y;
        const distance = Math.sqrt(a * a + b * b);

        if(distance < NODE_DISTANCE) {
          const alpha = remap(distance, 0, NODE_DISTANCE, 1, 0);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      } else {
        break;
      }
    }
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

function remap(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};