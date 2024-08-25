import { Circle } from "./Circle";

export class Spell extends Circle {
  private _isAlive: boolean = true;

  public die() {
    this._isAlive = false;
  }

  public get isAlive() {
    return this._isAlive;
  }
}
