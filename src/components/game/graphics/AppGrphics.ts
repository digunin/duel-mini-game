import { Circle } from "./../game-units/Circle";
import { Point } from "../game-units/primitives/Point";

export abstract class AppGraphics {
  protected _context: unknown | null = null;
  constructor(
    protected screenWidth: number,
    protected screenHeight: number,
    protected coordConverter: CoordConverter
  ) {
    this.coordConverter.setSize(this.screenWidth, this.screenHeight);
  }

  public get size() {
    return { width: this.screenWidth, height: this.screenHeight };
  }

  public clear() {}

  public drawCircle(circle: Circle, color: unknown): void {}
}

export abstract class CoordConverter {
  protected screenWidth: number = 0;
  protected screenHeight: number = 0;
  constructor();
  constructor(screenWidth: number, screenHeight: number);
  constructor(screenWidth?: number, screenHeight?: number) {
    if (screenWidth != null && screenHeight != null) {
      this.screenWidth = screenWidth;
      this.screenHeight = screenHeight;
    }
  }

  public convert(p: Point) {
    return p;
  }
  public setSize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
  }
}

export class EmptyCoordConverter extends CoordConverter {}
