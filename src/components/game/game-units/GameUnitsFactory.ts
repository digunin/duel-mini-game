import { AppGraphics } from "../graphics/AppGrphics";
import { Circle } from "./Circle";
import { Point } from "./primitives/Point";

export abstract class GameUnitFactory {
  constructor(private _graphics: AppGraphics) {}
  public abstract createCircle(center: Point, radius: number): unknown;

  public get graphics() {
    return this._graphics;
  }
}

export class DefaultFactory extends GameUnitFactory {
  public createCircle(center: Point, radius: number): Circle {
    return new Circle(this.graphics, center, radius);
  }
}
