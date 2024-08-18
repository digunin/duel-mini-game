import type { Point } from "./Point";

export class Line {
  private angle: number;
  constructor(private from: Point, private to: Point) {
    if (from.y === to.y) {
      this.angle = 0;
      return;
    }
    if (from.x === to.x) {
      this.angle = Math.PI / 2;
      return;
    }
    this.angle = Math.atan((to.y - from.y) / (to.x - from.x));
  }
}
