import { DefaultFactory } from "../components/game/game-units/GameUnitsFactory";
import { ReactCanvasGraphics } from "../components/game/graphics/ReactCanvasGraphics";
import { HTMLCanvasCoordConverter } from "../components/game/graphics/HTMLCanvasCoordConverter";
import { Game } from "../components/game/Game";
import { useCanvasMousePosition } from "./useCanvasMousePosition";
import { useRef } from "react";

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

  function canvasClickHandler() {
    const leftOrRight = duel.current.isCursorInsideHero(canvasCursor.current);
    console.log(leftOrRight);
  }

  return { update: duel.current.update };
};
