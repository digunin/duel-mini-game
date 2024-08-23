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
}
