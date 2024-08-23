import { DefaultFactory } from "../components/game/game-units/GameUnitsFactory";
import { ReactCanvasGraphics } from "../components/game/graphics/ReactCanvasGraphics";
import { HTMLCanvasCoordConverter } from "../components/game/graphics/HTMLCanvasCoordConverter";
import { Game } from "../components/game/Game";

export const useGame = (
  width: number,
  height: number,
  canvas: React.RefObject<HTMLCanvasElement>
) => {
  const duel = new Game(
    new DefaultFactory(
      new ReactCanvasGraphics(
        canvas,
        width,
        height,
        new HTMLCanvasCoordConverter()
      )
    )
  );

  return { update: duel.update };
};
