import { Circle } from "../game-units/Circle";
import { AppGraphics, CoordConverter } from "./AppGrphics";

export class HTMLCanvasGraphics extends AppGraphics {
  constructor(coordConverter: CoordConverter) {
    super(coordConverter);
  }

  public setContext(ctx: CanvasRenderingContext2D): void {
    this.context = ctx;
  }

  public drawCircle(circle: Circle, color: string): void {
    super.drawCircle(circle, color);
    const context = this.context as CanvasRenderingContext2D;
    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = 4;
    const { x, y } = this.coordConverter.convert(circle.center);
    context.arc(x, y, circle.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}
