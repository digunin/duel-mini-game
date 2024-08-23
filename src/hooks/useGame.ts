import { useRef } from "react";
import { Point } from "../components/game/game-units/primitives/Point";
import { Circle } from "../components/game/game-units/Circle";
import { DefaultFactory } from "../components/game/game-units/GameUnitsFactory";
import { HTMLCanvasGraphics } from "../components/game/graphics/HTMLCanvasGraphics";
import { HTMLCanvasCoordConverter } from "../components/game/graphics/HTMLCanvasCoordConverter";

export const useGame = (width: number, height: number) => {
  const unitFactory = new DefaultFactory(
    new HTMLCanvasGraphics(new HTMLCanvasCoordConverter(width, height))
  );
  const ball = useRef<Circle>(unitFactory.createCircle(new Point(61, 60), 60));

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 1000, 500);
    unitFactory.graphics.setContext(ctx);
    ball.current.draw("red");
  };

  const update = (ctx: CanvasRenderingContext2D) => {
    if (ball.current.center.y <= 60) ball.current.velocity_Y = 3;
    if (ball.current.center.y >= 440) ball.current.velocity_Y = -3;
    ball.current.nextMove(true);
    draw(ctx);
  };

  return { update };
};
