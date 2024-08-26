import { fromDegToRad, fromRadToDeg } from "../utils";

export class Vector {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number);
  constructor(angleBetweenAxisX: number);
  constructor(angleOrX: number, y?: number) {
    if (y != null) {
      (this._x = angleOrX), (this._y = y);
    } else {
      this._x = Math.cos(fromDegToRad(angleOrX));
      this._y = Math.sin(fromDegToRad(angleOrX));
    }
  }

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
