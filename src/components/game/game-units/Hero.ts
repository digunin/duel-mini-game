import { Circle } from "./Circle";

const COOLDOWN_STEP = 100;

export class Hero extends Circle {
  private stopFire: boolean = false;
  private _cooldown: number = 5;
  public spellColor: string = "black";
  private damaged = 0;
  private damagedColor = "white";

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

  public damage(color: string) {
    this.damaged = 8;
    this.damagedColor = color;
  }

  public draw() {
    let color = this.color;
    if (this.damaged > 0) {
      color = this.damagedColor;
      this.damaged--;
    }

    this.graphics.drawCircle(this, color);
  }
}
