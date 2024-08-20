import React from "react";
import { Game } from "./components/game/Game";
import { HeroPanel } from "./components/HeroPanel";
import { useAppScreen } from "./hooks/useAppScreen";

function App() {
  const { orient } = useAppScreen();

  if (orient == "portrait") {
    return (
      <div className="app-container">
        <Game />
        <div className="hero-panel-block">
          <HeroPanel
            score={0}
            onchangeHandler={(props) => console.log("Левая панель: ", props)}
          />
          <HeroPanel
            score={0}
            onchangeHandler={(props) => console.log("Правая панель: ", props)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container landscape">
      <HeroPanel
        score={0}
        onchangeHandler={(props) => console.log("Левая панель: ", props)}
      />
      <Game />
      <HeroPanel
        score={0}
        onchangeHandler={(props) => console.log("Правая панель: ", props)}
      />
    </div>
  );
}

export default App;
