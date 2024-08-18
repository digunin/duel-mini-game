import { Unit } from "./GameUnit";
import { Point } from "./primitives/Point";

export class Circle extends Unit {
  public center: Point;
  public radius: number;
  constructor(center: Point, radius: number) {
    super(
      new Point(center.x - radius, center.y - radius),
      2 * radius,
      2 * radius
    );
    this.center = center;
    this.radius = radius;
  }
}
