import React, { useMemo, useRef } from "react";
import { useGame } from "../../hooks/useGame";
import { AppCanvas } from "../AppCanvas";
import { useAppContext } from "../../hooks/useAppContext";

export const GameComponent = () => {
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scale, baseSize } = useAppContext().state;
  const { update } = useGame(baseSize.width, baseSize.height, gameCanvasRef);
  const { width, height } = baseSize;

  return useMemo(
    () => (
      <div className="game-container">
        <AppCanvas
          width={width}
          height={height}
          scale={scale}
          gameCanvasRef={gameCanvasRef}
          update={update}
        />
      </div>
    ),
    [update, scale, width, height]
  );
};
