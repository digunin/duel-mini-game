import React, { useState } from "react";
import { GameComponent } from "./components/game/GameComponent";
import { HeroPanel } from "./components/HeroPanel";
import { useAppScreen } from "./hooks/useAppScreen";
import { AppHeader } from "./components/AppHeader";
import { useHeroControl } from "./hooks/useHeroControl";
import { HeroMenu } from "./components/HeroMenu";
import { Point } from "./components/game/game-units/primitives/Point";
import { useAppContext } from "./hooks/useAppContext";
import { HeroSide } from "./components/game/Game";
import { setLeftHero, setRightHero } from "./store/actions";
import { HeroClickHandler } from "./hooks/useGame";

function App() {
  const { orient } = useAppScreen();
  const { left, right, setHeroProps } = useHeroControl();
  const { dispatch } = useAppContext();
  const [menuPosition, setMenuPosition] = useState<Point | null>(null);
  const [activeHero, setActiveHero] = useState<HeroSide>("left");

  const onColorChangeHandler = (spellColor: string) => {
    if (activeHero === "left") {
      dispatch(setLeftHero({ spellColor }));
    } else {
      dispatch(setRightHero({ spellColor }));
    }
    setMenuPosition(null);
  };

  const onHeroClicklHandler: HeroClickHandler = (point, hero, canvasRect) => {
    const menuPosition = new Point(
      Math.min(point.x, canvasRect!.right - 110 || point.x),
      Math.min(point.y, canvasRect!.bottom - 200 || point.y)
    );
    setMenuPosition(menuPosition);
    setActiveHero(hero);
  };

  if (orient == "portrait") {
    return (
      <>
        <AppHeader />
        <div className="app-container">
          <GameComponent key="game" onHeroClicklHandler={onHeroClicklHandler} />
          <div className="hero-panel-block">
            <HeroPanel
              key="left-panel"
              values={left}
              onchangeHandler={setHeroProps("left")}
            />
            <HeroPanel
              key="right-panel"
              values={right}
              onchangeHandler={setHeroProps("right")}
            />
          </div>
        </div>
        {menuPosition && (
          <HeroMenu position={menuPosition} callback={onColorChangeHandler} />
        )}
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <div className="app-container landscape">
        <HeroPanel
          key="left-panel"
          values={left}
          onchangeHandler={setHeroProps("left")}
        />
        <GameComponent key="game" onHeroClicklHandler={onHeroClicklHandler} />
        <HeroPanel
          key="right-panel"
          values={right}
          onchangeHandler={setHeroProps("right")}
        />
      </div>
      {menuPosition && (
        <HeroMenu position={menuPosition} callback={onColorChangeHandler} />
      )}
    </>
  );
}

export default App;
