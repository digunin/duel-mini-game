import { AppGraphics } from "../graphics/AppGrphics";
import { Unit } from "./GameUnit";
import { Line } from "./primitives/Line";
import { Point } from "./primitives/Point";
import { Vector } from "./primitives/Vector";

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

  public nextMove(confirmMove?: boolean) {
    const nextPos = super.nextMove(confirmMove);
    return new Point(nextPos.x + this.radius, nextPos.y + this.radius);
  }

  public reflecFromLine(l: Line) {
    const angle = l.vector.angleBetweenAxisX;
    const newAngle = (angle * 2 - this._direction) % 360;
    const d = newAngle < 0 ? 360 + newAngle : newAngle;
    this.direction = d;
  }

  public reflectFromPoint(p: Point) {
    const v = new Vector(this.center.x - p.x, this.center.y - p.y);
    const perpend = new Vector(v.angleBetweenAxisX + 90);
    this.reflecFromLine(
      new Line(new Point(0, 0), new Point(perpend.x, perpend.y))
    );
  }
}
