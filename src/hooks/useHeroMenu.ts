import { useState } from "react";
import { useAppContext } from "./useAppContext";
import { Point } from "../game/game-units/primitives/Point";
import { HeroSide } from "../game/Game";
import { setLeftHero, setRightHero } from "../store/actions";
import { HeroClickHandler } from "./useGame";

export const useHeroMenu = () => {
  const [menuPosition, setMenuPosition] = useState<Point | null>(null);
  const [activeHero, setActiveHero] = useState<HeroSide>("left");
  const { dispatch } = useAppContext();

  const MENU_WIDTH = 100;
  const MENU_HEIGHT = 200;

  const onColorChangeHandler = (spellColor: string) => {
    if (activeHero === "left") {
      dispatch(setLeftHero({ spellColor }));
    } else {
      dispatch(setRightHero({ spellColor }));
    }
    setMenuPosition(null);
  };

  const onHeroClicklHandler: HeroClickHandler = (point, hero, canvasRect) => {
    if (!hero) {
      setMenuPosition(null);
      return;
    }
    const menuPosition = new Point(
      Math.min(point.x, canvasRect!.right - MENU_WIDTH - 10 || point.x),
      Math.min(point.y, canvasRect!.bottom - MENU_HEIGHT || point.y)
    );
    setMenuPosition(menuPosition);
    setActiveHero(hero);
  };

  return { menuPosition, onColorChangeHandler, onHeroClicklHandler };
};
