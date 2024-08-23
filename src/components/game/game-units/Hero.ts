import { Circle } from "./Circle";

export class Hero extends Circle {
  private stopFire: boolean = false;
  public cooldown: number = 1500;
  public spellColor: string = "#00F";
}
