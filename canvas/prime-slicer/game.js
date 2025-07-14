const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game variables
let score = 0;
let misses = 0;
const maxMisses = 100;
let circles = [];
let gameOver = false;

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.1) {
    spawnCircle();
  }

  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    circle.update();
    circle.draw();

    if (circle.y - circle.radius > canvas.height) {
      if (!isPrime(circle.number)) {
        misses++;
        if (misses >= maxMisses) {
          gameOver = true;
        }
      }
      circles.splice(i, 1);
    }
  }

  // Draw score and misses
  ctx.fillStyle = '#000';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Score: ' + score, 20, 40);
  ctx.fillText('Misses: ' + misses, canvas.width - 120, 40);

  requestAnimationFrame(gameLoop);
}

class Circle {
  constructor(x, y, radius, number, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.number = number;
    this.vx = vx;
    this.vy = vy;
    this.gravity = 0.1;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = isPrime(this.number) ? '#ff0000' : '#0000ff';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `${this.radius / 1.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.number, this.x, this.y);
  }
}

function spawnCircle(x, y, number, vx, vy) {
  const num = number || Math.floor(Math.random() * 99) + 2;
  const radius = 25 + num / 2;
  const startX = x || Math.random() * (canvas.width - radius * 2) + radius;
  const startY = y || canvas.height + radius;
  const startVX = vx || (Math.random() * 2 - 1);
  const startVY = vy || -12 - Math.random() * 6;
  circles.push(new Circle(startX, startY, radius, num, startVX, startVY));
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    const dx = mouseX - circle.x;
    const dy = mouseY - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle.radius) {
      if (isPrime(circle.number)) {
        misses++;
        if (misses >= maxMisses) {
          gameOver = true;
        }
        circles.splice(i, 1);
      } else {
        const factors = getTwoLargestFactors(circle.number);
        if (factors) {
          const [factor1, factor2] = factors;
          // Spawn two new circles from the split
          spawnCircle(circle.x, circle.y, factor1, -2, -8);
          spawnCircle(circle.x, circle.y, factor2, 2, -8);
          score += circle.number;
        }
        circles.splice(i, 1);
      }
    }
  }
});

gameLoop();