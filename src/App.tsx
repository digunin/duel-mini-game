import React from "react";
import { Game } from "./components/game/Game";
import { HeroPanel } from "./components/HeroPanel";
import { useAppScreen } from "./hooks/useAppScreen";
import { AppHeader } from "./components/AppHeader";

function App() {
  const { orient } = useAppScreen();

  if (orient == "portrait") {
    return (
      <>
        <AppHeader />
        <div className="app-container">
          <Game key="game" />
          <div className="hero-panel-block">
            <HeroPanel
              key="left-panel"
              score={0}
              onchangeHandler={(props) => console.log("Левая панель: ", props)}
            />
            <HeroPanel
              key="right-panel"
              score={0}
              onchangeHandler={(props) => console.log("Правая панель: ", props)}
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
          score={0}
          onchangeHandler={(props) => console.log("Левая панель: ", props)}
        />
        <Game key="game" />
        <HeroPanel
          key="right-panel"
          score={0}
          onchangeHandler={(props) => console.log("Правая панель: ", props)}
        />
      </div>
    </>
  );
}

export default App;
