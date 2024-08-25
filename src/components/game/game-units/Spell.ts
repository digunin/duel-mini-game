import { Circle } from "./Circle";

export class Spell extends Circle {
  private isAlive: boolean = true;

  public die() {
    this.isAlive = false;
  }
}
