class Square {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.d = 1;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  setH(h) {
    this.h = h;
  }

  setW(w) {
    this.w = w;
  }

  setColor(color) {
    this.color = color;
  }
}
