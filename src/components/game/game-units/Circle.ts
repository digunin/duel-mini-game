import { AppGraphics } from "../graphics/AppGrphics";
import { Unit } from "./GameUnit";
import { Point } from "./primitives/Point";

export class Circle extends Unit {
  public radius: number;
  constructor(graphics: AppGraphics, center: Point, radius: number) {
    let position = new Point(center.x - radius, center.y - radius);
    super(graphics, position, radius * 2, radius * 2);
    this.radius = radius;
  }

  public get center() {
    return new Point(
      this.position.x + this.radius,
      this.position.y + this.radius
    );
  }
  public set center(c: Point) {
    this.position.x = c.x - this.radius;
    this.position.y = c.y - this.radius;
  }

  public draw(): void {
    this.graphics.drawCircle(this, this.color);
  }
}
