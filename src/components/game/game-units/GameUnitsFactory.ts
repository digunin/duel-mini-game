import { AppGraphics } from "../graphics/AppGrphics";
import { Circle } from "./Circle";
import { Point } from "./primitives/Point";

export abstract class GameUnitFactory<T extends AppGraphics> {
  constructor(private _graphics: T) {}
  public abstract createCircle(center: Point, radius: number): unknown;

  public get graphics() {
    return this._graphics;
  }
}

export class DefaultFactory<T extends AppGraphics> extends GameUnitFactory<T> {
  public createCircle(center: Point, radius: number): Circle {
    return new Circle(this.graphics, center, radius);
  }
}
