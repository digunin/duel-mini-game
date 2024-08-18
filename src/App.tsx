import React from "react";
import { Game } from "./components/game/Game";
import { Scoreboard } from "./components/Scoreboard";
import { ControlPanel } from "./components/ControlPanel";
import { AppContainer } from "./components/AppContainer";

function App() {
  return (
    <AppContainer>
      <Scoreboard />
      <Game />
      <ControlPanel />
    </AppContainer>
  );
}

export default App;
