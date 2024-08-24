import { fromRadToDeg } from "../utils";

export class Vector {
  constructor(private _x: number, private _y: number) {}

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public dot(v: Vector) {
    return this._x * v.x + this._y * v.y;
  }

  public get length() {
    return Math.sqrt(this.dot(this));
  }

  public get angleBetweenAxisX() {
    const xAxis = new Vector(1, 0);
    const _cos = this.dot(xAxis) / (xAxis.length * this.length);
    const angle = fromRadToDeg(Math.acos(_cos));
    if (this._y < 0) return (360 - angle) % 180;
    return angle;
  }

  public multiply(n: number) {
    return new Vector(Math.round(this._x * n), Math.round(this._y * n));
  }
}
