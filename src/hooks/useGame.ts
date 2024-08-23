import { useRef } from "react";
import { Point } from "../components/game/game-units/primitives/Point";
import { Circle } from "../components/game/game-units/Circle";
import { DefaultFactory } from "../components/game/game-units/GameUnitsFactory";
import { ReactCanvasGraphics } from "../components/game/graphics/ReactCanvasGraphics";
import { HTMLCanvasCoordConverter } from "../components/game/graphics/HTMLCanvasCoordConverter";

export const useGame = (
  width: number,
  height: number,
  canvas: React.RefObject<HTMLCanvasElement>
) => {
  const unitFactory = new DefaultFactory(
    new ReactCanvasGraphics(
      canvas,
      width,
      height,
      new HTMLCanvasCoordConverter()
    )
  );

  const ball = useRef<Circle>(unitFactory.createCircle(new Point(61, 60), 60));

  const draw = () => {
    unitFactory.graphics.clear();
    ball.current.draw("red");
  };

  const update = () => {
    if (ball.current.center.y <= 60) ball.current.velocity_Y = 3;
    if (ball.current.center.y >= 440) ball.current.velocity_Y = -3;
    ball.current.nextMove(true);
    draw();
  };

  return { update };
};
