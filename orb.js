class Orb {
  constructor(x, y, polarity) {
    this.x = x;
    this.y = y;
    this.polarity = polarity; // 0: positive, 1: negative, 2: neutral
    this.stability = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.polarity === 0 ? '#ff5555' : this.polarity === 1 ? '#5555ff' : '#55ff55';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.stability / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.stability -= 0.45;
    return this.stability <= 0;
  }
}

module.exports = Orb;
