import { Circle } from "./Circle";

const COOLDOWN_STEP = 100;

export class Hero extends Circle {
  private stopFire: boolean = false;
  private _cooldown: number = 5;
  public spellColor: string = "#00F";

  public fire() {
    if (this.stopFire) return false;
    this.stopFire = true;
    setTimeout(() => (this.stopFire = false), COOLDOWN_STEP * this._cooldown);
    return true;
  }

  public set cooldown(c: number) {
    if (c < 1) c = 1;
    if (c > 9) c = 9;
    this._cooldown = 10 - c;
  }
}
