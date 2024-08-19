import { Unit } from "./GameUnit";
import { Point } from "./primitives/Point";

export class Circle extends Unit {
  public radius: number;
  constructor(center: Point, radius: number);
  constructor(position: Point, width: number, height: number);
  constructor(center: Point, widthOrRadius: number, height?: number) {
    let width = height == null ? widthOrRadius * 2 : widthOrRadius;
    let position =
      height == null
        ? new Point(center.x - widthOrRadius, center.y - widthOrRadius)
        : center;

    super(position, width, width);
    this.radius = width / 2;
  }

  public get center() {
    return new Point(
      this.position.x + this.radius,
      this.position.y + this.radius
    );
  }
}
