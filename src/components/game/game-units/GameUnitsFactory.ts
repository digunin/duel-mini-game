import { AppGraphics } from "../graphics/AppGrphics";
import { Circle } from "./Circle";
import { Hero } from "./Hero";
import { Point } from "./primitives/Point";

export abstract class GameUnitFactory<T extends AppGraphics> {
  constructor(private _graphics: T) {}
  public abstract createCircle(center: Point, radius: number): Circle;
  public abstract createHero(center: Point, radius: number): Hero;

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
}
