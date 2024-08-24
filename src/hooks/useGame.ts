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

  duel.current.setHeroVelocity("left", leftHero.velocity);
  duel.current.setHeroVelocity("right", rightHero.velocity);

  duel.current.setHeroCooldown("left", leftHero.cooldown);
  duel.current.setHeroCooldown("right", rightHero.cooldown);

  function canvasClickHandler() {
    const leftOrRight = duel.current.isCursorInsideHero(canvasCursor.current);
  }

  return { update: duel.current.update };
};
