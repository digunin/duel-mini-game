import { DefaultFactory } from "../components/game/game-units/GameUnitsFactory";
import { ReactCanvasGraphics } from "../components/game/graphics/ReactCanvasGraphics";
import { HTMLCanvasCoordConverter } from "../components/game/graphics/HTMLCanvasCoordConverter";
import { Game } from "../components/game/Game";
import { useCanvasMousePosition } from "./useCanvasMousePosition";
import { useRef } from "react";
import { useAppContext } from "./useAppContext";

export const useGame = (
  width: number,
  height: number,
  canvas: React.RefObject<HTMLCanvasElement>
) => {
  const { canvasCursor, windowCursor } = useCanvasMousePosition(
    width,
    height,
    canvasClickHandler
  );
  const { leftHero, rightHero } = useAppContext().state;

  const duel = useRef(
    new Game(
      new DefaultFactory(
        new ReactCanvasGraphics(
          canvas,
          width,
          height,
          new HTMLCanvasCoordConverter()
        )
      )
    )
  );

  duel.current.setVelocity("left", leftHero.velocity);
  duel.current.setVelocity("right", rightHero.velocity);

  function canvasClickHandler() {
    const leftOrRight = duel.current.isCursorInsideHero(canvasCursor.current);
  }

  return { update: duel.current.update };
};
