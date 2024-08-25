import { DefaultFactory } from "../components/game/game-units/GameUnitsFactory";
import { ReactCanvasGraphics } from "../components/game/graphics/ReactCanvasGraphics";
import { HTMLCanvasCoordConverter } from "../components/game/graphics/HTMLCanvasCoordConverter";
import { Game, HeroSide } from "../components/game/Game";
import { useCanvasMousePosition } from "./useCanvasMousePosition";
import { useCallback, useRef } from "react";
import { useAppContext } from "./useAppContext";
import { GameEvent } from "../components/game/GameEvents";
import { increaseScore } from "../store/actions";
import { Point } from "../components/game/game-units/primitives/Point";

export type HeroClickHandler = (
  p: Point,
  hero: HeroSide,
  canvasRect: DOMRect | undefined
) => void;

export const useGame = (
  width: number,
  height: number,
  canvas: React.RefObject<HTMLCanvasElement>,
  onHeroClicklHandler: HeroClickHandler
) => {
  const { canvasCursor } = useCanvasMousePosition(
    width,
    height,
    canvasClickHandler,
    canvas
  );
  const { state, dispatch } = useAppContext();
  const { leftHero, rightHero } = state;

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

  duel.current.setHeroSpellColor("left", leftHero.spellColor);
  duel.current.setHeroSpellColor("right", rightHero.spellColor);

  duel.current.cursorPosition = canvasCursor;

  const heroDamagedHandler = useCallback((e: GameEvent) => {
    dispatch(increaseScore(e.heroDamaged));
  }, []);

  duel.current.subscribe("hero-damaged", heroDamagedHandler);

  function canvasClickHandler(e: MouseEvent) {
    const leftOrRight = duel.current.isCursorInsideHero();
    const canvasRect = canvas.current?.getBoundingClientRect();
    if (leftOrRight) {
      onHeroClicklHandler(
        new Point(e.clientX, e.clientY),
        leftOrRight,
        canvasRect
      );
    }
  }

  return { update: duel.current.update };
};
