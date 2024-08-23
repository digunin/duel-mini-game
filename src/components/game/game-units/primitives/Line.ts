import { Point } from "./Point";
import { Vector } from "./Vector";

export class Line {
  constructor(private from: Point, private to: Point) {}

  public get vector() {
    return new Vector(this.to.x - this.from.x, this.to.y - this.from.y);
  }
}
