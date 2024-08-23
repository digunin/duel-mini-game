import { Circle } from "./Circle";
import { Line } from "./primitives/Line";
import { Point } from "./primitives/Point";

export function intersectCircleWithPoint(
  circle: Circle,
  point: Point
): Point | null {
  const v = new Line(circle.center, point).vector;
  return v.dot(v) <= circle.radius * circle.radius ? point : null;
}
