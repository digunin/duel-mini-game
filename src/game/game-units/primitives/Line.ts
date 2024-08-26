import { Point } from "./Point";
import { Vector } from "./Vector";

export class Line {
  constructor(private _from: Point, private _to: Point) {}

  public get vector() {
    return new Vector(this._to.x - this._from.x, this._to.y - this._from.y);
  }

  public get from(): Point {
    return this._from;
  }

  public get to(): Point {
    return this._to;
  }
}
