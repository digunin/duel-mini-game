import React from "react";
import { useGame } from "../../hooks/useGame";
import { AppCanvas } from "../AppCanvas";
import { useAppContext } from "../../hooks/useAppContext";

export const Game = () => {
  const { update } = useGame();
  const { scale, baseSize } = useAppContext().state;
  const { width, height } = baseSize;

  return (
    <div className="game-container">
      <AppCanvas width={width} height={height} scale={scale} update={update} />
    </div>
  );
};
