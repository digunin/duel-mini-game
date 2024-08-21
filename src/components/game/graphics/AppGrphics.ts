import { Circle } from "./../game-units/Circle";
import { Point } from "../game-units/primitives/Point";

export abstract class AppGraphics {
  protected context: CanvasRenderingContext2D | null = null;
  constructor(protected coordConverter: CoordConverter) {}

  public abstract setContext(ctx: unknown): void;
  public drawCircle(circle: Circle, color: unknown): void {
    if (this.context == null) {
      throw new Error("Graphic context is null");
    }
  }
}

export abstract class CoordConverter {
  constructor(protected screenWidth: number, protected screenHeight: number) {}
  public convert(p: Point) {
    return p;
  }
}
