import { Line } from "./primitives/Line";
import { Point } from "./primitives/Point";

export function fromRadToDeg(angle: number): number {
  return Math.round((angle / (Math.PI * 2)) * 360);
}

export function fromDegToRad(angle: number): number {
  return (angle / 360) * Math.PI * 2;
}

export function intersectCircleWithPoint(
  center: Point,
  radius: number,
  point: Point
): Point | null {
  const v = new Line(center, point).vector;
  return v.dot(v) <= radius * radius ? point : null;
}

export function intersectCircleWithLine(
  center: Point,
  radius: number,
  line: Line
): Line | Point | null {
  // решение уравнения, выведенного из свойства:
  // скалярное произвеение перпендикулярных векторов равно нулю

  // вектор из начала линии в центр круга
  const lf_c_v = new Line(line.from, center).vector;
  const l_v = line.vector;
  const k = lf_c_v.dot(l_v) / l_v.dot(l_v);
  // если перпендикуляр опускается мимо отрезка,
  // то проверить пересечение с крайней точкой отрезка
  if (k < 0) return intersectCircleWithPoint(center, radius, line.from);
  if (k > 1) return intersectCircleWithPoint(center, radius, line.to);

  const part_l = l_v.multiply(k);
  const intersection_point = new Point(
    line.from.x + part_l.x,
    line.from.y + part_l.y
  );

  // вернуть сравнение длин перпендикуляра и радиуса круга
  const p = new Line(center, intersection_point).vector;
  if (p.length <= radius) return line;
  return null;
}

export function intersectCircleWithCircle(
  center_1: Point,
  radius_1: number,
  center_2: Point,
  radius_2: number
): Point | null {
  const c_v = new Line(center_1, center_2).vector;
  if (c_v.length <= radius_1 + radius_2) {
    const k = radius_1 / (radius_2 + radius_1);
    const r1_v = c_v.multiply(k);
    return new Point(center_1.x + r1_v.x, center_1.y + r1_v.y);
  }
  return null;
}
