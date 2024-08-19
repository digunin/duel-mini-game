import { useRef } from "react";
import { Point } from "../components/game/game-units/primitives/Point";
import { Circle } from "../components/game/game-units/Circle";

export const useGame = () => {
  const ball = useRef<Circle>(new Circle(new Point(61, 60), 60));

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 800, 400);
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.lineWidth = 4;
    const { x, y } = ball.current.center;
    ctx.arc(x, y, ball.current.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };

  const update = (ctx: CanvasRenderingContext2D) => {
    if (ball.current.center.y <= 60) ball.current.velocity_Y = 3;
    if (ball.current.center.y >= 340) ball.current.velocity_Y = -3;
    ball.current.nextMove(true);
    draw(ctx);
  };

  return { update };
};
