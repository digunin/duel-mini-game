import { Point } from "../game-units/primitives/Point";
import { CoordConverter } from "./AppGrphics";

export class HTMLCanvasCoordConverter extends CoordConverter {
  public convert(p: Point): Point {
    return new Point(p.x, this.screenHeight - p.y);
  }
}
