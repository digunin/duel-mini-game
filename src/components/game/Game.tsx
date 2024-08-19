import React from "react";
import { useGame } from "../../hooks/useGame";
import { AppCanvas } from "../AppCanvas";

export const Game = () => {
  const { update } = useGame();

  return (
    <div className="game-container">
      <AppCanvas update={update} />
    </div>
  );
};
