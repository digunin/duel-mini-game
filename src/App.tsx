import React, { useState } from "react";
import { GameComponent } from "./components/game/GameComponent";
import { HeroPanel } from "./components/HeroPanel";
import { useAppScreen } from "./hooks/useAppScreen";
import { AppHeader } from "./components/AppHeader";
import { useHeroControl } from "./hooks/useHeroControl";
import { HeroMenu } from "./components/HeroMenu";
import { useHeroMenu } from "./hooks/useHeroMenu";

function App() {
  const { orient } = useAppScreen();
  const { left, right, setHeroProps } = useHeroControl();
  const { menuPosition, onColorChangeHandler, onHeroClicklHandler } =
    useHeroMenu();

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
