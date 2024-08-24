import React from "react";
import { GameComponent } from "./components/game/GameComponent";
import { HeroPanel } from "./components/HeroPanel";
import { useAppScreen } from "./hooks/useAppScreen";
import { AppHeader } from "./components/AppHeader";
import { useHeroControl } from "./hooks/useHeroControl";

function App() {
  const { orient } = useAppScreen();
  const { left, right, setHeroProps } = useHeroControl();

  if (orient == "portrait") {
    return (
      <>
        <AppHeader />
        <div className="app-container">
          <GameComponent key="game" />
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
        <GameComponent key="game" />
        <HeroPanel
          key="right-panel"
          values={right}
          onchangeHandler={setHeroProps("right")}
        />
      </div>
    </>
  );
}

export default App;
