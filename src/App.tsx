import React from "react";
import { Game } from "./components/game/Game";
import { HeroPanel } from "./components/HeroPanel";

function App() {
  return (
    <div className="app-container">
      <Game />
      <HeroPanel
        score={0}
        onchangeHandler={(props) => console.log("Левая панель: ", props)}
      />
      <HeroPanel
        score={0}
        onchangeHandler={(props) => console.log("Правая панель: ", props)}
      />
    </div>
  );
}

export default App;
