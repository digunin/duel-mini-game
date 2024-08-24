import { Circle } from "./Circle";
import { Line } from "./primitives/Line";
import { Point } from "./primitives/Point";

export function fromRadToDeg(angle: number): number {
  return Math.round((angle / (Math.PI * 2)) * 360);
}

export function fromDegToRad(angle: number): number {
  return (angle / 360) * Math.PI * 2;
}

export function intersectCircleWithPoint(
  circle: Circle,
  point: Point
): Point | null {
  const v = new Line(circle.center, point).vector;
  return v.dot(v) <= circle.radius * circle.radius ? point : null;
}
