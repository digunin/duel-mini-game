import React, { FC, useMemo, useRef } from "react";
import { HeroClickHandler, useGame } from "../hooks/useGame";
import { AppCanvas } from "./AppCanvas";
import { useAppContext } from "../hooks/useAppContext";

type GCProps = {
  onHeroClicklHandler: HeroClickHandler;
};

export const GameComponent: FC<GCProps> = ({ onHeroClicklHandler }) => {
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scale, baseSize } = useAppContext().state;
  const { update } = useGame(
    baseSize.width,
    baseSize.height,
    gameCanvasRef,
    onHeroClicklHandler
  );
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
