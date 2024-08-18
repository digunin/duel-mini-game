import React from "react";
import { useAppContext } from "../hooks/useAppContext";

export const Game = () => {
  const {
    state: { baseSize },
  } = useAppContext();

  return (
    <div className="game-container">
      <canvas width={baseSize.width} height={baseSize.height} />
    </div>
  );
};
