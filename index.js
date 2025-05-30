const { createCanvas } = require('canvas');
const Orb = require('./orb.js');

class VoidCascade {
  constructor() {
    this.canvas = createCanvas(400, 600);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 10;
    this.rows = 15;
    this.orbs = [];
    this.score = 0;
    this.cycle = 1;
    this.maxOrbs = 5;
    this.spawnOrb();
  }

  spawnOrb() {
    if (this.orbs.length >= this.maxOrbs) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const polarity = Math.floor(Math.random() * 3); // 0: positive, 1: negative, 2: neutral
    this.orbs.push(new Orb(col * this.gridSize, row * this.gridSize, polarity));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#555555';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#121229';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.orbs.length - 1; i >= 0; i--) {
      this.orbs[i].draw(this.ctx);
      if (this.orbs[i].update()) {
        this.orbs.splice(i, 1);
        this.spawnOrb();
      }
    }

    this.checkBalance();
    this.drawUI();
  }

  checkBalance() {
    const toRemove = [];
    for (let i = 0; i < this.orbs.length; i++) {
      for (let j = i + 1; j < this.orbs.length; j++) {
        const o1 = this.orbs[i];
        const o2 = this.orbs[j];
        if (
          o1.polarity === o2.polarity &&
          (
            (Math.abs(o1.x - o2.x) <= this.gridSize && o1.y === o2.y) || // Horizontal
            (Math.abs(o1.y - o2.y) <= this.gridSize && o1.x === o2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = o1.polarity === 0 ? '#ff5555' : o1.polarity === 1 ? '#5555ff' : '#55ff55';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(o1.x + this.gridSize / 2, o1.y + this.gridSize / 2);
          this.ctx.lineTo(o2.x + this.gridSize / 2, o2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 35 * this.cycle;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.orbs.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnOrb();
      if (this.score >= this.cycle * 350) this.advanceCycle();
    }
  }

  advanceCycle() {
    this.cycle++;
    this.maxOrbs = Math.min(this.maxOrbs + 1, 10);
    this.orbs.forEach(o => (o.stability = Math.min(o.stability + 15, 100)));
    this.spawnOrb();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Cycle: ${this.cycle}`, 10, 45);
  }

  handleClick(x, y) {
    for (const orb of this.orbs) {
      const d = Math.sqrt(
        Math.pow(x - (orb.x + this.gridSize / 2), 2) +
        Math.pow(y - (orb.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        orb.polarity = (orb.polarity + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.orbs = [];
    this.score = 0;
    this.cycle = 1;
    this.maxOrbs = 5;
    this.spawnOrb();
  }
}

// Example usage (for testing in Node.js)
const game = new VoidCascade();
game.update();
console.log('Void Cascade game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
