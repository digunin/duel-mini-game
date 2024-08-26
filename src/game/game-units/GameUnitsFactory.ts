import { AppGraphics } from "../graphics/AppGrphics";
import { Circle } from "./Circle";
import { Hero } from "./Hero";
import { Point } from "./primitives/Point";
import { Spell } from "./Spell";

export abstract class GameUnitFactory<T extends AppGraphics> {
  constructor(private _graphics: T) {}
  public abstract createCircle(center: Point, radius: number): Circle;
  public abstract createHero(center: Point, radius: number): Hero;
  public abstract createSpell(center: Point, radius: number): Spell;

  public get graphics() {
    return this._graphics;
  }
}

export class DefaultFactory<T extends AppGraphics> extends GameUnitFactory<T> {
  public createCircle(center: Point, radius: number) {
    return new Circle(this.graphics, center, radius);
  }
  public createHero(center: Point, radius: number) {
    return new Hero(this.graphics, center, radius);
  }
  public createSpell(center: Point, radius: number) {
    return new Spell(this.graphics, center, radius);
  }
}
