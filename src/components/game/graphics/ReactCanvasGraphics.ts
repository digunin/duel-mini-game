import React from "react";
import { Circle } from "../game-units/Circle";
import { AppGraphics, CoordConverter } from "./AppGrphics";

export class ReactCanvasGraphics extends AppGraphics {
  constructor(
    protected canvas: React.RefObject<HTMLCanvasElement>,
    protected screenWidth: number,
    protected screenHeight: number,
    protected coordConverter: CoordConverter
  ) {
    super(screenWidth, screenHeight, coordConverter);
  }
  public get context() {
    return this.canvas.current?.getContext("2d");
  }

  public clear() {
    const context = this.context as CanvasRenderingContext2D;

    if (context == null) return;
    context.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  public drawCircle(circle: Circle, color: string): void {
    const context = this.context;
    if (context == null) return;

    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = 4;
    const { x, y } = this.coordConverter.convert(circle.center);
    context.arc(x, y, circle.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}
